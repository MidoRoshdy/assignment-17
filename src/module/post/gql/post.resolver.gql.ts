import { PostStatus, PostVisibility } from "../../../common/enums/post.enum";
import { GqlContext, requireAuth } from "../../gql/auth.context";
import { postService } from "../post.service";

export class PostResolverGql {
  async createPost(
    _parent: unknown,
    args: {
      content: string;
      status?: PostStatus;
      visibility?: PostVisibility;
    },
    context: GqlContext,
  ) {
    const user = await requireAuth(context);
    return postService.createPost({
      content: args.content,
      userId: String(user._id),
      ...(args.status !== undefined ? { status: args.status } : {}),
      ...(args.visibility !== undefined ? { visibility: args.visibility } : {}),
    });
  }

  getPosts() {
    return postService.getPosts();
  }

  getPost(_parent: unknown, args: { postId: string }) {
    return postService.getPostById(args.postId);
  }

  async updatePost(
    _parent: unknown,
    args: {
      postId: string;
      content?: string;
      status?: PostStatus;
      visibility?: PostVisibility;
    },
    context: GqlContext,
  ) {
    const user = await requireAuth(context);
    return postService.updatePost({
      postId: args.postId,
      userId: String(user._id),
      ...(args.content !== undefined ? { content: args.content } : {}),
      ...(args.status !== undefined ? { status: args.status } : {}),
      ...(args.visibility !== undefined ? { visibility: args.visibility } : {}),
    });
  }

  async deletePost(
    _parent: unknown,
    args: { postId: string },
    context: GqlContext,
  ) {
    const user = await requireAuth(context);
    return postService.deletePost(args.postId, String(user._id));
  }
}

export const postResolverGQL = new PostResolverGql();
