import { Request, Response } from "express";
import AuthService, { hashPass } from "../services/AuthService";
import { generateHash } from "../utils/BcryptUtils";

class AuthController {
    constructor() {}

    async signUp(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;
        
        // Verifica se todos os campos estão presentes
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Certifique-se de que está enviando os campos email, name e password" });
        }
    
        try {
            // Criptografa a senha
            const hashedPass = await hashPass(password);
            
            // Cria o usuário no banco de dados
            const user = await AuthService.signUp(name, email, hashedPass);
            
            // Retorna sucesso com os detalhes do usuário e uma mensagem
            return res.status(200).json({ 
                message: "Registro bem-sucedido. Bem-vindo!", 
                user: { email: user.email, name: user.name } 
            });
        } catch (error) {
            console.error("Erro ao criar o usuário:", error);
            throw new Error("Um erro ocorreu ao criar o usuário. Por favor, tente novamente.");
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
}

export default new AuthController();
