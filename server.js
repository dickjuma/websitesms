const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const Redis = require("ioredis");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/sma-chat";
const REDIS_URL = process.env.REDIS_URL || null;

let logger;
let io;
let redisClient = null;
let redisPub = null;
let redisSub = null;

const activeUsers = new Map();
const activeAdmins = new Map();
const typingUsers = new Map();
const rateLimitMap = new Map();

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "").split(",").filter(Boolean);
const RATE_LIMIT_WINDOW = 60000;
const RATE_LIMIT_MAX_MESSAGES = 10;

async function initLogger() {
  const pino = await import("pino");
  logger = pino.default({
    level: process.env.LOG_LEVEL || "info",
    transport: dev ? { target: "pino-pretty" } : undefined,
    formatters: {
      level: (label) => ({ level: label }),
    },
  });
}

async function connectMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error({ err: error }, "MongoDB connection failed");
    if (!dev) process.exit(1);
  }
}

async function connectRedis() {
  if (!REDIS_URL) {
    logger.warn("Redis not configured, using in-memory storage");
    return;
  }

  try {
    redisClient = new Redis(REDIS_URL);
    redisPub = new Redis(REDIS_URL);
    redisSub = new Redis(REDIS_URL);

    redisClient.on("connect", () => logger.info("Redis client connected"));
    redisClient.on("error", (err) => logger.error({ err }, "Redis client error"));

    redisSub.subscribe("chat-events", (err) => {
      if (err) logger.error({ err }, "Redis subscribe error");
    });

    redisSub.on("message", (channel, message) => {
      if (channel === "chat-events") {
        const event = JSON.parse(message);
        io.to(event.room).emit(event.type, event.data);
      }
    });

    logger.info("Redis connected successfully");
  } catch (error) {
    logger.error({ err: error }, "Redis connection failed");
    redisClient = null;
  }
}

const MessageSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    leadId: { type: String, index: true },
    sessionId: { type: String, required: true, index: true },
    sender: { type: String, enum: ["user", "admin", "bot", "agent"], required: true },
    senderId: { type: String, default: null },
    senderName: { type: String, default: null },
    message: { type: String, required: true },
    status: { type: String, enum: ["sent", "delivered", "seen"], default: "sent" },
    clientMessageId: { type: String, default: null, index: true },
    metadata: {
      userAgent: String,
      pageUrl: String,
      leadId: String,
    },
  },
  { timestamps: true }
);

MessageSchema.index({ userId: 1, createdAt: -1 });
MessageSchema.index({ leadId: 1, createdAt: -1 });
MessageSchema.index({ sessionId: 1, createdAt: -1 });

const MessageModel = mongoose.models.Message || mongoose.model("Message", MessageSchema);

async function saveMessage(data) {
  try {
    const message = await MessageModel.create(data);
    return message;
  } catch (error) {
    logger.error({ err: error, data }, "Failed to save message");
    return null;
  }
}

async function getChatHistory(userId, limit = 50) {
  try {
    const messages = await MessageModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return messages.reverse();
  } catch (error) {
    logger.error({ err: error, userId }, "Failed to get chat history");
    return [];
  }
}

function checkRateLimit(socketId) {
  const now = Date.now();
  const userHistory = rateLimitMap.get(socketId) || [];
  const recentMessages = userHistory.filter((t) => now - t < RATE_LIMIT_WINDOW);

  if (recentMessages.length >= RATE_LIMIT_MAX_MESSAGES) {
    return false;
  }

  recentMessages.push(now);
  rateLimitMap.set(socketId, recentMessages);
  return true;
}

function validateOrigin(origin) {
  if (dev) return true;
  if (!origin) return true;
  if (ALLOWED_ORIGINS.length === 0) return true;
  return ALLOWED_ORIGINS.includes(origin);
}

function broadcastToRedis(type, room, data) {
  if (!redisPub) return;
  redisPub.publish("chat-events", JSON.stringify({ type, room, data }));
}

app.prepare().then(async () => {
  await initLogger();
  await connectMongoDB();
  await connectRedis();

  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      logger.error({ err, url: req.url }, "Error handling request");
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  io = new Server(server, {
    path: "/api/socket/io",
    addTrailingSlash: false,
    cors: {
      origin: (origin, callback) => {
        if (validateOrigin(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Origin not allowed"));
        }
      },
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
    pingTimeout: 60000,
    pingInterval: 25000,
    allowUpgrades: true,
  });

  logger.info("Socket.IO server initialized on path /api/socket/io");

  io.on("connection", (socket) => {
    logger.info({ socketId: socket.id, ip: socket.handshake.address }, "Client connected");
    let currentUserId = null;
    let currentAdminId = null;

    socket.on("join", async ({ userId, sessionId, userName, metadata }) => {
      if (!userId) {
        socket.emit("error", { message: "userId is required" });
        return;
      }

      currentUserId = userId;
      socket.join(userId);

      if (!activeUsers.has(userId)) {
        activeUsers.set(userId, {
          socketId: socket.id,
          sessionId: sessionId || userId,
          name: userName || "Anonymous",
          joinedAt: new Date().toISOString(),
          unreadCount: 0,
          lastSeen: new Date().toISOString(),
          metadata: metadata || {},
        });
      } else {
        const user = activeUsers.get(userId);
        user.socketId = socket.id;
        user.sessionId = sessionId || user.sessionId;
        user.lastSeen = new Date().toISOString();
      }

      logger.info({ userId, sessionId }, "User joined");

      const history = await getChatHistory(userId);
      socket.emit("chat_history", { userId, messages: history });

      io.emit("users_update", Array.from(activeUsers.values()).map((u) => ({
        userId: u.socketId,
        name: u.name,
        sessionId: u.sessionId,
        joinedAt: u.joinedAt,
        isOnline: true,
        unreadCount: u.unreadCount,
      })));

      io.to("admin-room").emit("new_user", {
        userId,
        sessionId: sessionId || userId,
        name: userName || "Anonymous",
        metadata: metadata || {},
        timestamp: new Date().toISOString(),
      });
    });

    socket.on("join_admin", ({ adminId, adminName }) => {
      if (!adminId) return;

      currentAdminId = adminId;
      socket.join("admin-room");

      activeAdmins.set(adminId, {
        socketId: socket.id,
        name: adminName || "Admin",
        connectedAt: new Date().toISOString(),
      });

      logger.info({ adminId, adminName }, "Admin joined");

      socket.emit("admin_connected", {
        admins: Array.from(activeAdmins.values()),
        users: Array.from(activeUsers.values()).map((u) => ({
          userId: u.socketId,
          name: u.name,
          sessionId: u.sessionId,
          joinedAt: u.joinedAt,
          isOnline: true,
          unreadCount: u.unreadCount,
        })),
      });

      socket.emit("users_update", Array.from(activeUsers.values()).map((u) => ({
        userId: u.socketId,
        name: u.name,
        sessionId: u.sessionId,
        joinedAt: u.joinedAt,
        isOnline: true,
        unreadCount: u.unreadCount,
      })));
    });

    socket.on("send_message", async ({ userId, sessionId, sender, message, clientMessageId, senderName }) => {
      if (!userId || !message?.trim()) return;

      if (!checkRateLimit(socket.id)) {
        socket.emit("rate_limited", { message: "Too many messages. Please wait." });
        return;
      }

      const messageId = clientMessageId || `msg-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

      const savedMessage = await saveMessage({
        userId,
        sessionId: sessionId || userId,
        sender,
        senderId: sender === "admin" ? currentAdminId : null,
        senderName: senderName || null,
        message: message.trim(),
        status: "sent",
        clientMessageId,
      });

      const payload = {
        id: savedMessage?._id?.toString() || messageId,
        userId,
        sessionId: sessionId || userId,
        sender,
        senderId: sender === "admin" ? currentAdminId : null,
        senderName: senderName || null,
        message: message.trim(),
        status: "sent",
        clientMessageId,
        timestamp: savedMessage?.createdAt?.toISOString() || new Date().toISOString(),
      };

      io.to(userId).emit("receive_message", payload);
      io.to("admin-room").emit("user_message", { ...payload, isNew: sender === "user" });

      if (redisClient) {
        redisClient.hset(`user:${userId}`, "lastMessage", message.trim());
        redisClient.hset(`user:${userId}`, "lastMessageAt", new Date().toISOString());
      }

      socket.emit("message_sent", { success: true, userId, clientMessageId, messageId: payload.id });

      logger.info({ userId, sender, messageLength: message.length }, "Message sent");
    });

    socket.on("typing", ({ userId, sender, isTyping }) => {
      if (!userId) return;

      const typingKey = `${userId}:${sender}`;
      if (isTyping) {
        typingUsers.set(typingKey, setTimeout(() => {
          io.to(userId).emit("typing", { userId, sender, isTyping: false });
          io.to("admin-room").emit("user_typing", { userId, sender, isTyping: false });
        }, 5000));
      } else {
        const timeout = typingUsers.get(typingKey);
        if (timeout) {
          clearTimeout(timeout);
          typingUsers.delete(typingKey);
        }
      }

      io.to(userId).emit("typing", { userId, sender, isTyping });
      io.to("admin-room").emit("user_typing", { userId, sender, isTyping });
    });

    socket.on("mark_delivered", async ({ userId, messageIds }) => {
      if (!userId || !messageIds?.length) return;

      await MessageModel.updateMany(
        { _id: { $in: messageIds }, userId },
        { $set: { status: "delivered" } }
      );

      io.to(userId).emit("message_status", { status: "delivered", messageIds });
      logger.info({ userId, messageIds }, "Messages marked as delivered");
    });

    socket.on("mark_seen", async ({ userId, messageIds }) => {
      if (!userId || !messageIds?.length) return;

      await MessageModel.updateMany(
        { _id: { $in: messageIds }, userId },
        { $set: { status: "seen" } }
      );

      io.to(userId).emit("message_status", { status: "seen", messageIds });
      logger.info({ userId, messageIds }, "Messages marked as seen");
    });

    socket.on("takeover", ({ userId, adminId, adminName }) => {
      if (!userId) return;

      io.to(userId).emit("agent_active", {
        userId,
        adminId: adminId || "admin",
        adminName: adminName || "Agent",
        isActive: true,
        timestamp: new Date().toISOString(),
      });

      io.to("admin-room").emit("lead_taken", { userId, adminId, adminName });

      const user = activeUsers.get(userId);
      if (user) user.unreadCount = 0;

      logger.info({ userId, adminName }, "Admin took over chat");
    });

    socket.on("return_to_ai", ({ userId }) => {
      if (!userId) return;

      io.to(userId).emit("agent_active", {
        userId,
        isActive: false,
        timestamp: new Date().toISOString(),
      });

      io.to("admin-room").emit("lead_released", { userId });

      logger.info({ userId }, "Chat returned to AI");
    });

    socket.on("disconnect", (reason) => {
      logger.info({ socketId: socket.id, reason }, "Client disconnected");

      if (currentUserId) {
        const user = activeUsers.get(currentUserId);
        if (user) {
          user.lastSeen = new Date().toISOString();
        }
        logger.info({ userId: currentUserId }, "User disconnected");
        io.emit("user_offline", { userId: currentUserId });
      }

      if (currentAdminId) {
        activeAdmins.delete(currentAdminId);
        logger.info({ adminId: currentAdminId }, "Admin disconnected");
      }
    });

    socket.on("error", (error) => {
      logger.error({ socketId: socket.id, error: error.message }, "Socket error");
    });
  });

  server.listen(port, (err) => {
    if (err) throw err;
    logger.info(`> Ready on http://${hostname}:${port}`);
    logger.info(`> Environment: ${dev ? "development" : "production"}`);
    logger.info(`> Socket.IO path: /api/socket/io`);
    logger.info(`> MongoDB: ${MONGODB_URI}`);
    logger.info(`> Redis: ${REDIS_URL || "not configured"}`);
  });

  process.on("SIGTERM", async () => {
    logger.info("SIGTERM received, shutting down gracefully");
    if (redisClient) await redisClient.quit();
    if (redisPub) await redisPub.quit();
    if (redisSub) await redisSub.quit();
    await mongoose.disconnect();
    server.close(() => process.exit(0));
  });

  process.on("SIGINT", async () => {
    logger.info("SIGINT received, shutting down gracefully");
    if (redisClient) await redisClient.quit();
    if (redisPub) await redisPub.quit();
    if (redisSub) await redisSub.quit();
    await mongoose.disconnect();
    server.close(() => process.exit(0));
  });
});