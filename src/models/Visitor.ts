import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const visitorSchema = new Schema(
  {
    visitorId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fingerprint: {
      type: String,
      default: "",
    },
    ipAddress: {
      type: String,
      default: "",
    },
    userAgent: {
      type: String,
      default: "",
    },
    deviceType: {
      type: String,
      default: "",
    },
    timezone: {
      type: String,
      default: "",
    },
    leadId: {
      type: Schema.Types.ObjectId,
      ref: "Lead",
      default: null,
    },
    currentSessionId: {
      type: String,
      default: "",
      index: true,
    },
    sessionCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    lastSeenAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    visitCount: {
      type: Number,
      default: 1,
    },
    leadScore: {
      type: Number,
      default: 0,
    },
    pagesVisited: [
      {
        path: String,
        title: String,
        visitedAt: { type: Date, default: Date.now },
        timeSpent: { type: Number, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  },
);

visitorSchema.index({ leadId: 1 });
visitorSchema.index({ lastSeenAt: -1 });

export type VisitorDocument = InferSchemaType<typeof visitorSchema> & {
  _id: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const VisitorModel =
  (models.Visitor as Model<VisitorDocument>) ||
  model<VisitorDocument>("Visitor", visitorSchema);
