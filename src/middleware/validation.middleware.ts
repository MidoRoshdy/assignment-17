import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { BadRequestException } from "../common/exceptions/error.responce";

export const validation = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let validationResult = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!validationResult.success) {
      throw new BadRequestException(
        "validation error",
        validationResult.error.issues,
      );
    }

    next();
  };
};
