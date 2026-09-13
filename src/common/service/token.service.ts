import { env } from "../../config/env.service";
import { BadRequestException } from "../exceptions/error.responce";
import jwt, { JwtPayload } from "jsonwebtoken";

export class TokenService {
  constructor() {}

  async generateToken(user: any) {
    let signature = undefined;
    let audiance = undefined;
    let refreshSignature = undefined;
    switch (user.role) {
      case "admin":
        signature = env.jwtSecretAdmin;
        audiance = "Admin";
        refreshSignature = env.jwtRefreshSecretAdmin;
        break;

      default:
        signature = env.jwtSecretUser;
        audiance = "User";
        refreshSignature = env.jwtRefreshSecretUser;
        break;
    }

    let accessToken = jwt.sign({ id: user._id }, signature as string, {
      audience: audiance,
      expiresIn: "30d",
    });
    let refreshToken = jwt.sign({ id: user._id }, refreshSignature as string, {
      audience: audiance,
      expiresIn: "1y",
    });
    return { accessToken, refreshToken };
  }

  async decodeToken(token: string) {
    try {
      let decoded = jwt.decode(token) as JwtPayload;
      if (!decoded) {
        throw new BadRequestException("invalid token");
      }
      let signature = undefined;
      const audience = Array.isArray(decoded.aud) ? decoded.aud[0] : decoded.aud;
      switch (audience) {
        case "Admin":
          signature = env.jwtSecretAdmin;
          break;
        default:
          signature = env.jwtSecretUser;
          break;
      }

      let decodedData = jwt.verify(token, signature as string);
      if (decodedData) {
        return decodedData;
      } else {
        throw new BadRequestException("invalid token");
      }
    } catch (error) {
      throw new BadRequestException("invalid token", error);
    }
  }

  async decodeRefreshToken(refreshToken: string) {
    let decoded = jwt.decode(refreshToken) as JwtPayload;
    if (!decoded) {
      throw new BadRequestException("invalid token");
    }
    let signature = undefined;
    const audience = Array.isArray(decoded.aud) ? decoded.aud[0] : decoded.aud;
    switch (audience) {
      case "Admin":
        signature = env.jwtRefreshSecretAdmin;
        break;
      default:
        signature = env.jwtRefreshSecretUser;
        break;
    }
    let decodedData = jwt.verify(refreshToken, signature as string);
    if (!decodedData) {
      throw new BadRequestException("invalid token");
    }
    return decodedData;
  }
}
