import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const messageSchema = new Schema(
  {
    leadId: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
      index: true,
    },
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    sender: {
      type: String,
      enum: ["user", "bot", "agent"],
      required: true,
    },
    message: {
      type: String,
      trim: true,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
    clientMessageId: {
      type: String,
      default: "",
      index: true,
    },
  },
  {
    versionKey: false,
  },
);

messageSchema.index({ leadId: 1, timestamp: -1 });
messageSchema.index({ sessionId: 1, timestamp: -1 });
messageSchema.index({ leadId: 1, clientMessageId: 1 });

export type MessageDocument = InferSchemaType<typeof messageSchema> & {
  _id: Schema.Types.ObjectId;
};

export const MessageModel =
  (models.Message as Model<MessageDocument>) ||
  model<MessageDocument>("Message", messageSchema);
