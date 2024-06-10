// src/controllers/AuthController.ts
import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { generateHash } from "../utils/BcryptUtils";

class AuthController {
    constructor() {}

    async signUp(req: Request, res: Response) {
        const { email, name, password } = req.body;

        if (!email || !name || !password) {
            res.status(400).json({ status: "error", message: "Falta parâmetros" });
            return;
        }

        const hashPassword = await generateHash(password);
        if (!hashPassword) {
            res.status(500).json({ status: "error", message: "Erro ao criptografar senha ..." });
            return;
        }

        try {
            const newUser = await AuthService.signUp({ name, email, password: hashPassword });
            res.status(201).json({ status: "ok", newUser });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ status: "error", message: error.message });
            } else {
                res.status(500).json({ status: "error", message: "Erro desconhecido" });
            }
        }
    }

    async signIn(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ status: "error", message: "Falta parâmetros" });
            return;
        }

        try {
            const result = await AuthService.signIn(email, password);
            if (!result) {
                res.status(401).json({ status: "error", message: "Credenciais inválidas" });
                return;
            }

            res.json({ status: "ok", token: result.token, user: result.user });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ status: "error", message: error.message });
            } else {
                res.status(500).json({ status: "error", message: "Erro desconhecido" });
            }
        }
    }

    async signOut(req: Request, res: Response) {
        // A implementação de signOut depende de como você deseja gerenciar a sessão/tokens
        res.json({ status: "ok", message: "Logout realizado com sucesso" });
    }
}

export default new AuthController();
