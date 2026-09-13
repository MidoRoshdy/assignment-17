interface IErrorResponse {
  message: string;
  status: number;
  cause?: unknown;
}

export class ErrorResponse extends Error implements IErrorResponse {
  constructor(
    message: string,
    public status: number,
    cause?: unknown,
  ) {
    super(message, { cause });
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(message: string = "Bad Request", cause?: unknown) {
    super(message, 400, cause);
  }
}
export class UnauthorizedError extends ErrorResponse {
  constructor(message: string = "Unauthorized", cause?: unknown) {
    super(message, 401, cause);
  }
}
export class ForbiddenError extends ErrorResponse {
  constructor(message: string = "Forbidden", cause?: unknown) {
    super(message, 403, cause);
  }
}
export class NotFoundError extends ErrorResponse {
  constructor(message: string = "Not Found", cause?: unknown) {
    super(message, 404, cause);
  }
}
export class ConflictError extends ErrorResponse {
  constructor(message = "Conflict", cause?: unknown) {
    super(message, 409, cause);
  }
}
export class UnprocessableEntityError extends ErrorResponse {
  constructor(message: string = "Unprocessable Entity", cause?: unknown) {
    super(message, 422, cause);
  }
}
export class TooManyRequestsError extends ErrorResponse {
  constructor(message: string = "Too Many Requests", cause?: unknown) {
    super(message, 429, cause);
  }
}
export class BadGatewayError extends ErrorResponse {
  constructor(message: string = "Bad Gateway", cause?: unknown) {
    super(message, 502, cause);
  }
}
export class InternalServerError extends ErrorResponse {
  constructor(message: string = "Internal Server Error", cause?: unknown) {
    super(message, 500, cause);
  }
}
export class BadRequestException extends ErrorResponse {
  constructor(message: string = "Bad Request", cause?: unknown) {
    super(message, 400, cause);
  }
}
