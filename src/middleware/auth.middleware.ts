import { Request, Response, NextFunction } from "express";
import { BadRequestException } from "../common/exceptions/error.responce";
import { TokenService } from "../common/service/token.service";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

let tokenService = new TokenService();

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.headers);
  if (req.headers.authorization) {
    let [flag, token] = req.headers.authorization.split(" ");
    let decodedData = await tokenService.decodeToken(token as string);
    if (decodedData) {
      req.user = decodedData as { id: string };
      next();
    } else {
      throw new BadRequestException("invalid token");
    }
  } else {
    throw new BadRequestException("token not found");
  }
};
