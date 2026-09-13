import {
  ForbiddenError,
  NotFoundError,
} from "../../common/exceptions/error.responce";
import {
  PostDeleted,
  PostStatus,
  PostVisibility,
} from "../../common/enums/post.enum";
import { PostModel } from "../../DB/model/post.model";
import { Types } from "mongoose";

type CreatePostInput = {
  content: string;
  status?: PostStatus;
  visibility?: PostVisibility;
  userId: string;
};

type UpdatePostInput = {
  postId: string;
  content?: string;
  status?: PostStatus;
  visibility?: PostVisibility;
  userId: string;
};

export class PostService {
  async createPost(data: CreatePostInput) {
    const post = await PostModel.create({
      content: data.content,
      userId: new Types.ObjectId(data.userId),
      status: data.status ?? PostStatus.PUBLISHED,
      visibility: data.visibility ?? PostVisibility.PUBLIC,
      isDeleted: PostDeleted.NO,
    });

    return await post.populate("userId", "-password");
  }

  async getPosts() {
    return PostModel.find({ isDeleted: PostDeleted.NO })
      .populate("userId", "-password")
      .sort({ createdAt: -1 });
  }

  async getPostById(postId: string) {
    const post = await PostModel.findOne({
      _id: postId,
      isDeleted: PostDeleted.NO,
    }).populate("userId", "-password");

    if (!post) {
      throw new NotFoundError("post not found");
    }

    return post;
  }

  async updatePost(data: UpdatePostInput) {
    const post = await PostModel.findOne({
      _id: data.postId,
      isDeleted: PostDeleted.NO,
    });

    if (!post) {
      throw new NotFoundError("post not found");
    }

    if (String(post.userId) !== data.userId) {
      throw new ForbiddenError("you can only update your own posts");
    }

    if (data.content !== undefined) post.content = data.content;
    if (data.status !== undefined) post.status = data.status;
    if (data.visibility !== undefined) post.visibility = data.visibility;

    await post.save();
    return await post.populate("userId", "-password");
  }

  async deletePost(postId: string, userId: string) {
    const post = await PostModel.findOne({
      _id: postId,
      isDeleted: PostDeleted.NO,
    });

    if (!post) {
      throw new NotFoundError("post not found");
    }

    if (String(post.userId) !== userId) {
      throw new ForbiddenError("you can only delete your own posts");
    }

    post.isDeleted = PostDeleted.YES;
    post.deletedAt = new Date();
    post.status = PostStatus.DELETED;
    await post.save();

    return { message: "post deleted successfully", postId: String(post._id) };
  }
}

export const postService = new PostService();
