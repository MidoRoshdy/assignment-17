import { TokenService } from "../../common/service/token.service";
import { UnauthorizedError } from "../../common/exceptions/error.responce";
import { UserModel, HUserDocument } from "../../DB/model/user.model";

export type GqlContext = {
  userId?: string;
};

const tokenService = new TokenService();

export const buildGqlContext = async (
  authorization?: string,
): Promise<GqlContext> => {
  if (!authorization) {
    return {};
  }

  const [flag, token] = authorization.split(" ");
  if (!token || (flag !== "Bearer" && flag !== "bearer")) {
    return {};
  }

  try {
    const decoded = (await tokenService.decodeToken(token)) as { id?: string };
    if (!decoded?.id) {
      return {};
    }
    return { userId: String(decoded.id) };
  } catch {
    return {};
  }
};

export const requireAuth = async (
  context: GqlContext,
): Promise<HUserDocument> => {
  if (!context.userId) {
    throw new UnauthorizedError("token not found");
  }

  const user = await UserModel.findById(context.userId);
  if (!user) {
    throw new UnauthorizedError("user not found");
  }

  return user;
};
