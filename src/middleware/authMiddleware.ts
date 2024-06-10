import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';



export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'sua-chave-secreta') as JwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Token inválido" });
    }
};
