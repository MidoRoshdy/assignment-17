import mongoose, { HydratedDocument, Model, Schema, Types } from "mongoose";
import {
  PostDeleted,
  PostStatus,
  PostVisibility,
} from "../../common/enums/post.enum";

export interface IPostDocument {
  content: string;
  userId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  isDeleted?: PostDeleted;
  status?: PostStatus;
  visibility?: PostVisibility;
}

export type HPostDocument = HydratedDocument<IPostDocument>;

const postSchema = new Schema<IPostDocument>(
  {
    content: { type: String, required: true, trim: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(PostStatus),
      default: PostStatus.PUBLISHED,
    },
    visibility: {
      type: String,
      enum: Object.values(PostVisibility),
      default: PostVisibility.PUBLIC,
    },
    isDeleted: {
      type: String,
      enum: Object.values(PostDeleted),
      default: PostDeleted.NO,
    },
    deletedAt: { type: Date },
  },
  { timestamps: true },
);

export const PostModel: Model<IPostDocument> =
  (mongoose.models.Post as Model<IPostDocument>) ||
  mongoose.model<IPostDocument>("Post", postSchema);
