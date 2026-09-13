import {
  CommentDeleted,
  CommentStatus,
  CommentVisibility,
  CommentType,
} from "../enums/comment.enum";

export interface IComment {
  CommentId: string;
  content: string;
  userId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  isDeleted: CommentDeleted;
  status: CommentStatus;
  visibility: CommentVisibility;
  type: CommentType;
}

export interface IUpdateComment {
  CommentId: string;
  content: string;
  status: CommentStatus;
  visibility: CommentVisibility;
  type: CommentType;
}

export interface IGetComment {
  CommentId: string;
  content: string;
  status: CommentStatus;
  visibility: CommentVisibility;
  type: CommentType;
}

export interface ICreateComment {
  CommentId: string;
  content: string;
  userId: string;
  postId: string;
  status: CommentStatus;
  visibility: CommentVisibility;
  type: CommentType;
}
