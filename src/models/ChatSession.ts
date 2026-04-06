import { randomUUID } from "crypto";

import { InferSchemaType, Model, Schema, model, models } from "mongoose";

function createSessionId() {
  return randomUUID();
}

const chatSessionSchema = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      default: createSessionId,
    },
    leadId: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
      index: true,
    },
    visitorId: {
      type: String,
      default: "",
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
      index: true,
    },
    title: {
      type: String,
      trim: true,
      default: "",
    },
    aiSummary: {
      type: String,
      default: "",
    },
    messageCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    startedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    lastActivityAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    lastMessagePreview: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

chatSessionSchema.index({ leadId: 1, lastActivityAt: -1 });
chatSessionSchema.index({ visitorId: 1, lastActivityAt: -1 });

export type ChatSessionDocument = InferSchemaType<typeof chatSessionSchema> & {
  _id: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const ChatSessionModel =
  (models.ChatSession as Model<ChatSessionDocument>) ||
  model<ChatSessionDocument>("ChatSession", chatSessionSchema);
