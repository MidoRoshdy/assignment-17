import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
  BadRequestException,
} from "../../common/exceptions/error.responce";
import {
  UserConfirmEmsil,
  UserGender,
  userprovider,
  UserRole,
  UserStatus,
} from "../../common/enums/user.enum";
import { compareHash, genertehash } from "../../common/security/security";
import { TokenService } from "../../common/service/token.service";
import { UserModel } from "../../DB/model/user.model";

type RegisterInput = {
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  gender: UserGender;
};

type LoginInput = {
  email: string;
  password: string;
};

export class UserService {
  private tokenService = new TokenService();

  async register(data: RegisterInput) {
    const existing = await UserModel.findOne({
      $or: [{ email: data.email.toLowerCase() }, { username: data.username }],
    });

    if (existing) {
      throw new ConflictError("email or username already exists");
    }

    const hashedPassword = await genertehash({ plainText: data.password });

    const user = await UserModel.create({
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email.toLowerCase(),
      password: hashedPassword,
      gender: data.gender,
      confirmEmail: UserConfirmEmsil.no,
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
      provider: userprovider.system,
    });

    const tokens = await this.tokenService.generateToken(user);

    return {
      message: "registered successfully",
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user,
    };
  }

  async login(data: LoginInput) {
    const user = await UserModel.findOne({ email: data.email.toLowerCase() });
    if (!user) {
      throw new UnauthorizedError("invalid email or password");
    }

    const matched = await compareHash({
      plainText: data.password,
      cypherText: user.password,
    });

    if (!matched) {
      throw new UnauthorizedError("invalid email or password");
    }

    if (user.status === UserStatus.BLOCKED) {
      throw new UnauthorizedError("account is blocked");
    }

    const tokens = await this.tokenService.generateToken(user);

    return {
      message: "logged in successfully",
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user,
    };
  }

  async getProfile(userId: string) {
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      throw new NotFoundError("user not found");
    }
    return user;
  }

  async getUserById(userId: string) {
    if (!userId) {
      throw new BadRequestException("userId is required");
    }
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      throw new NotFoundError("user not found");
    }
    return user;
  }
}

export const userService = new UserService();
