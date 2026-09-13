import {
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import {
  UserConfirmEmsil,
  UserGender,
  userprovider,
  UserRole,
  UserStatus,
} from "../../../common/enums/user.enum";

export const UserGenderGQL = new GraphQLEnumType({
  name: "UserGender",
  values: {
    MALE: { value: UserGender.MALE },
    FEMALE: { value: UserGender.FEMALE },
    OTHER: { value: UserGender.OTHER },
  },
});

export const UserRoleGQL = new GraphQLEnumType({
  name: "UserRole",
  values: {
    ADMIN: { value: UserRole.ADMIN },
    USER: { value: UserRole.USER },
  },
});

export const UserStatusGQL = new GraphQLEnumType({
  name: "UserStatus",
  values: {
    ACTIVE: { value: UserStatus.ACTIVE },
    INACTIVE: { value: UserStatus.INACTIVE },
    PENDING: { value: UserStatus.PENDING },
    BLOCKED: { value: UserStatus.BLOCKED },
  },
});

export const UserConfirmEmailGQL = new GraphQLEnumType({
  name: "UserConfirmEmail",
  values: {
    YES: { value: UserConfirmEmsil.yes },
    NO: { value: UserConfirmEmsil.no },
  },
});

export const UserProviderGQL = new GraphQLEnumType({
  name: "UserProvider",
  values: {
    GOOGLE: { value: userprovider.GOOGLE },
    EMAIL: { value: userprovider.EMAIL },
    SYSTEM: { value: userprovider.system },
  },
});

export const UserTypeGQL = new GraphQLObjectType({
  name: "User",
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (parent) => String(parent._id),
    },
    username: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    gender: { type: UserGenderGQL },
    role: { type: UserRoleGQL },
    status: { type: UserStatusGQL },
    confirmEmail: { type: UserConfirmEmailGQL },
    provider: { type: UserProviderGQL },
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

export const AuthPayloadGQL = new GraphQLObjectType({
  name: "AuthPayload",
  fields: {
    message: { type: new GraphQLNonNull(GraphQLString) },
    accessToken: { type: new GraphQLNonNull(GraphQLString) },
    refreshToken: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: new GraphQLNonNull(UserTypeGQL) },
  },
});
