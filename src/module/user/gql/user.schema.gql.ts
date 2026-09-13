import { AuthPayloadGQL, UserTypeGQL } from "./user.type.gql";
import {
  getUserArgsGQL,
  loginArgsGQL,
  registerArgsGQL,
} from "./user.args.gql";
import { userResolverGQL } from "./user.resolver.gql";

export class UserGqlSchema {
  registerQuery() {
    return {
      me: {
        type: UserTypeGQL,
        resolve: userResolverGQL.me.bind(userResolverGQL),
      },
      getUser: {
        type: UserTypeGQL,
        args: getUserArgsGQL,
        resolve: userResolverGQL.getUser.bind(userResolverGQL),
      },
    };
  }

  registerMutation() {
    return {
      register: {
        type: AuthPayloadGQL,
        args: registerArgsGQL,
        resolve: userResolverGQL.register.bind(userResolverGQL),
      },
      login: {
        type: AuthPayloadGQL,
        args: loginArgsGQL,
        resolve: userResolverGQL.login.bind(userResolverGQL),
      },
    };
  }
}
