import { GraphQLList, GraphQLNonNull } from "graphql";
import { DeletePostPayloadGQL, PostTypeGQL } from "./post.type.gql";
import {
  createPostArgsGQL,
  deletePostArgsGQL,
  getPostArgsGQL,
  updatePostArgsGQL,
} from "./post.args.gql";
import { postResolverGQL } from "./post.resolver.gql";

export class PostGqlSchema {
  registerQuery() {
    return {
      getPosts: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(PostTypeGQL)),
        ),
        resolve: postResolverGQL.getPosts.bind(postResolverGQL),
      },
      getPost: {
        type: PostTypeGQL,
        args: getPostArgsGQL,
        resolve: postResolverGQL.getPost.bind(postResolverGQL),
      },
    };
  }

  registerMutation() {
    return {
      createPost: {
        type: PostTypeGQL,
        args: createPostArgsGQL,
        resolve: postResolverGQL.createPost.bind(postResolverGQL),
      },
      updatePost: {
        type: PostTypeGQL,
        args: updatePostArgsGQL,
        resolve: postResolverGQL.updatePost.bind(postResolverGQL),
      },
      deletePost: {
        type: DeletePostPayloadGQL,
        args: deletePostArgsGQL,
        resolve: postResolverGQL.deletePost.bind(postResolverGQL),
      },
    };
  }
}
