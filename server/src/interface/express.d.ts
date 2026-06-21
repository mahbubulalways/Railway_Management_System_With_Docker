import { JwtPayload } from "jsonwebtoken";

// & HERE SET THE USER GLOBALLY
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
