import { JwtPayload } from "jsonwebtoken";
import { Decoded } from "./decoded";

declare global {
  namespace Express {
    interface Request {
      user: Decoded
    }
  }
}