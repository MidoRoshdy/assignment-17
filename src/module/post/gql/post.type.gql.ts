import {
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {
  PostDeleted,
  PostStatus,
  PostVisibility,
} from "../../../common/enums/post.enum";
import { UserTypeGQL } from "../../user/gql/user.type.gql";

export const PostStatusGQL = new GraphQLEnumType({
  name: "PostStatus",
  values: {
    DRAFT: { value: PostStatus.DRAFT },
    PUBLISHED: { value: PostStatus.PUBLISHED },
    ARCHIVED: { value: PostStatus.ARCHIVED },
    DELETED: { value: PostStatus.DELETED },
    REJECTED: { value: PostStatus.REJECTED },
    APPROVED: { value: PostStatus.APPROVED },
    PENDING: { value: PostStatus.PENDING },
  },
});

export const PostVisibilityGQL = new GraphQLEnumType({
  name: "PostVisibility",
  values: {
    PUBLIC: { value: PostVisibility.PUBLIC },
    PRIVATE: { value: PostVisibility.PRIVATE },
  },
});

export const PostDeletedGQL = new GraphQLEnumType({
  name: "PostDeleted",
  values: {
    NO: { value: PostDeleted.NO },
    YES: { value: PostDeleted.YES },
  },
});

export const PostTypeGQL = new GraphQLObjectType({
  name: "Post",
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (parent) => String(parent._id),
    },
    content: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: PostStatusGQL },
    visibility: { type: PostVisibilityGQL },
    isDeleted: { type: PostDeletedGQL },
    user: {
      type: UserTypeGQL,
      resolve: (parent) => {
        const user = parent.userId;
        if (
          !user ||
          typeof user !== "object" ||
          !("username" in user) ||
          !(user as { username?: string }).username
        ) {
          return null;
        }
        return user;
      },
    },
    createdAt: {
      type: GraphQLString,
      resolve: (parent) =>
        parent.createdAt ? new Date(parent.createdAt).toISOString() : null,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (parent) =>
        parent.updatedAt ? new Date(parent.updatedAt).toISOString() : null,
    },
  },
});

export const DeletePostPayloadGQL = new GraphQLObjectType({
  name: "DeletePostPayload",
  fields: {
    message: { type: new GraphQLNonNull(GraphQLString) },
    postId: { type: new GraphQLNonNull(GraphQLString) },
  },
});
