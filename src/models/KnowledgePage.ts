import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const knowledgePageSchema = new Schema(
  {
    route: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      default: "",
      trim: true,
    },
    summary: {
      type: String,
      default: "",
      trim: true,
    },
    content: {
      type: String,
      default: "",
      trim: true,
    },
    headings: {
      type: [String],
      default: [],
    },
    sourceType: {
      type: String,
      enum: ["scraped", "generated"],
      default: "scraped",
    },
    syncedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

knowledgePageSchema.index({ route: 1 }, { unique: true });
knowledgePageSchema.index({ syncedAt: -1 });

export type KnowledgePageDocument = InferSchemaType<typeof knowledgePageSchema> & {
  _id: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const KnowledgePageModel =
  (models.KnowledgePage as Model<KnowledgePageDocument>) ||
  model<KnowledgePageDocument>("KnowledgePage", knowledgePageSchema);
