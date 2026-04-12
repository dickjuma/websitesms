import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { registerSocketHandlers } from "./lib/socket-handler";

const PORT = process.env.SOCKET_PORT || 3001;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || "http://localhost:3000";

const origins = ALLOWED_ORIGINS.split(",").map((o) => o.trim());

const httpServer = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("SMA Socket Server Running");
});

const io = new SocketIOServer(httpServer, {
  path: "/api/socket/io",
  addTrailingSlash: false,
  transports: ["websocket", "polling"],
  cors: {
    origin: origins,
    methods: ["GET", "POST"],
    credentials: true,
  },
  maxHttpBufferSize: 1e6,
  pingTimeout: 60000,
  pingInterval: 25000,
});

io.on("connection", (socket) => {
  console.log(`[IO] Client connected: ${socket.id}`);
});

registerSocketHandlers(io);

httpServer.listen(PORT, () => {
  console.log(`=== Socket server running on port ${PORT} ===`);
  console.log(` Origins: ${origins.join(", ")}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down...");
  io.close();
  httpServer.close(() => {
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down...");
  io.close();
  httpServer.close(() => {
    process.exit(0);
  });
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  process.exit(1);
});