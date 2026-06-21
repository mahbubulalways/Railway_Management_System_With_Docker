export class AppError extends Error {
  statusCide: number;
  constructor(statusCode: number, message: string, stack = "") {
    super(message);
    this.statusCide = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
