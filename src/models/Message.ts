import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
  userId: string;
  leadId?: string;
  sessionId: string;
  sender: "user" | "admin" | "bot" | "agent";
  senderId?: string;
  senderName?: string;
  message: string;
  status: "sent" | "delivered" | "seen";
  clientMessageId?: string;
  timestamp: Date;
  metadata?: {
    userAgent?: string;
    userAgentData?: string;
    pageUrl?: string;
    leadId?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    leadId: {
      type: String,
      index: true,
    },
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    sender: {
      type: String,
      enum: ["user", "admin", "bot", "agent"],
      required: true,
    },
    senderId: {
      type: String,
      default: undefined,
    },
    senderName: {
      type: String,
      default: undefined,
    },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "seen"],
      default: "sent",
    },
    clientMessageId: {
      type: String,
      default: undefined,
      index: true,
    },
    metadata: {
      userAgent: String,
      userAgentData: String,
      pageUrl: String,
      leadId: String,
    },
  },
  {
    timestamps: true,
  }
);

MessageSchema.index({ userId: 1, createdAt: -1 });
MessageSchema.index({ leadId: 1, createdAt: -1 });
MessageSchema.index({ sessionId: 1, createdAt: -1 });
MessageSchema.index({ userId: 1, sessionId: 1, createdAt: -1 });
MessageSchema.index({ userId: 1, clientMessageId: 1 });

export const MessageModel: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default MessageModel;
