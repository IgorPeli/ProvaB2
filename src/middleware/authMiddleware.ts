import { Request, Response, NextFunction } from "express";
import { Decoded } from "../types/decoded";
import { verifyJwt } from "../services/AuthService";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
       const reqToken = req.headers.authorization;
       if (!reqToken){
           return res.status(401).json({error: "Not authenticated"});
       }
       const [_, token] = reqToken.split(" ");
       const decodedToken = verifyJwt(token);
       req.user= (decodedToken as Decoded);
       return next()
    } catch(e)  {
        console.log(e)
    }
}

export default authMiddleware;