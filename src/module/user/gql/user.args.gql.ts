import { GraphQLNonNull, GraphQLString } from "graphql";
import { UserGenderGQL } from "./user.type.gql";

export const registerArgsGQL = {
  username: { type: new GraphQLNonNull(GraphQLString) },
  firstName: { type: new GraphQLNonNull(GraphQLString) },
  lastName: { type: new GraphQLNonNull(GraphQLString) },
  phone: { type: new GraphQLNonNull(GraphQLString) },
  email: { type: new GraphQLNonNull(GraphQLString) },
  password: { type: new GraphQLNonNull(GraphQLString) },
  gender: { type: new GraphQLNonNull(UserGenderGQL) },
};

export const loginArgsGQL = {
  email: { type: new GraphQLNonNull(GraphQLString) },
  password: { type: new GraphQLNonNull(GraphQLString) },
};

export const getUserArgsGQL = {
  userId: { type: new GraphQLNonNull(GraphQLString) },
};
