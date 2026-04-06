import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const leadSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    businessNeed: {
      type: String,
      trim: true,
      default: "",
    },
    qualification: {
      type: String,
      enum: ["HOT", "WARM", "COLD"],
      default: "COLD",
    },
    leadScore: {
      type: Number,
      default: 0,
      min: 0,
    },
    isHumanActive: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new",
    },
    visitorId: {
      type: String,
      default: "",
      index: true,
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
    aiSummary: {
      type: String,
      default: "",
    },
    lastActivityAt: {
      type: Date,
      default: Date.now,
    },
    pagesVisited: [
      {
        path: String,
        title: String,
        visitedAt: { type: Date, default: Date.now },
        timeSpent: { type: Number, default: 0 },
      },
    ],
    activityTimeline: [
      {
        action: String,
        detail: String,
        timestamp: { type: Date, default: Date.now },
        metadata: { type: Schema.Types.Mixed },
      },
    ],
    chatDepth: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

leadSchema.index({ email: 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ qualification: 1, status: 1 });

export type LeadDocument = InferSchemaType<typeof leadSchema> & {
  _id: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const LeadModel =
  (models.Lead as Model<LeadDocument>) ||
  model<LeadDocument>("Lead", leadSchema);
