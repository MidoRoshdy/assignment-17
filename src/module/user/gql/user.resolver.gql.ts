import { GqlContext, requireAuth } from "../../gql/auth.context";
import { userService } from "../user.service";
import { UserGender } from "../../../common/enums/user.enum";

export class UserResolverGql {
  register(
    _parent: unknown,
    args: {
      username: string;
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      password: string;
      gender: UserGender;
    },
  ) {
    return userService.register(args);
  }

  login(
    _parent: unknown,
    args: {
      email: string;
      password: string;
    },
  ) {
    return userService.login(args);
  }

  me(_parent: unknown, _args: unknown, context: GqlContext) {
    return requireAuth(context).then((user) =>
      userService.getProfile(String(user._id)),
    );
  }

  getUser(_parent: unknown, args: { userId: string }) {
    return userService.getUserById(args.userId);
  }
}

export const userResolverGQL = new UserResolverGql();
