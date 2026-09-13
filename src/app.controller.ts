import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.service";
import { connectDB } from "./config/db.service";
import { globalErrorHandling } from "./middleware/errorHandling";
import { successResponse } from "./common/exceptions/success.responce";
import { createHandler } from "graphql-http/lib/use/express";
import { schema } from "./module/gql/schema.gql";
import { buildGqlContext } from "./module/gql/auth.context";

export const bootstrap = async () => {
  await connectDB();

  const app = express();
  app.use(express.json());

  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    }),
  );

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: "Too many requests, please try again later.",
  });
  app.use(limiter);

  app.use(helmet());

  app.all(
    "/graphql",
    createHandler({
      schema,
      context: async (req) => {
        const authorization = req.raw.headers.authorization;
        return buildGqlContext(authorization);
      },
    }),
  );

  app.get("/checkHealth", (req, res) => {
    successResponse({ res, message: "Server is running" });
  });

  app.use(globalErrorHandling);

  const port = Number(env.port) || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
