import { PostDeleted, PostStatus, PostVisibility } from "../enums/post.enum";
import { IUser } from "./user.interface";

export interface IPost {
  PostId: string;
  content: string;
  userId: string;
  user?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  isDeleted?: PostDeleted;
  status?: PostStatus;
  visibility?: PostVisibility;
}

export interface ICreatePost {
  PostId: string;
  content: string;
  userId: string;
  status: PostStatus;
  visibility: PostVisibility;
}

export interface IUpdatePost {
  PostId: string;
  content: string;
  status: PostStatus;
  visibility: PostVisibility;
}

export interface IGetPost {
  PostId: string;
  content: string;
  status: PostStatus;
  visibility: PostVisibility;
}
