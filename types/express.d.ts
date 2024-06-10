import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import { Decoded } from "./decoded"

declare module "express-serve-static-core" {
    interface Request {
        user?: Decoded;
    }
}
