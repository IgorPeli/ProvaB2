// CommentController.ts
import { Request, Response } from 'express';
export default {
    getAll(req: Request, res: Response) {
        // Verifique as permissões do usuário aqui
        const user = req.user
        // Obtenha todos os comentários
        res.send('Todos os comentários');
    },
    // Implemente outros métodos CRUD para manipulação de comentários
};


