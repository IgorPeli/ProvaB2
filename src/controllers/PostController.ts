// PostController.ts
import { Request, Response } from 'express';

export default {
    getAll(req: Request, res: Response) {
        // Verifique as permissões do usuário aqui
        const user = req.user;
        // Obtenha todos os posts
        res.send('Todos os posts');
    },
    // Implemente outros métodos CRUD para manipulação de posts
};
