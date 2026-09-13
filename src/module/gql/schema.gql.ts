import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { UserGqlSchema } from "../user/gql/user.schema.gql";
import { PostGqlSchema } from "../post/gql/post.schema.gql";

const userGql = new UserGqlSchema();
const postGql = new PostGqlSchema();

export const query = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    ...userGql.registerQuery(),
    ...postGql.registerQuery(),
  },
});

export const mutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    ...userGql.registerMutation(),
    ...postGql.registerMutation(),
  },
});

export const schema = new GraphQLSchema({ query, mutation });
