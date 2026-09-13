import { GraphQLNonNull, GraphQLString } from "graphql";
import { PostStatusGQL, PostVisibilityGQL } from "./post.type.gql";

export const createPostArgsGQL = {
  content: { type: new GraphQLNonNull(GraphQLString) },
  status: { type: PostStatusGQL },
  visibility: { type: PostVisibilityGQL },
};

export const getPostArgsGQL = {
  postId: { type: new GraphQLNonNull(GraphQLString) },
};

export const updatePostArgsGQL = {
  postId: { type: new GraphQLNonNull(GraphQLString) },
  content: { type: GraphQLString },
  status: { type: PostStatusGQL },
  visibility: { type: PostVisibilityGQL },
};

export const deletePostArgsGQL = {
  postId: { type: new GraphQLNonNull(GraphQLString) },
};
