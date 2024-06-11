// CommentController.ts
import { Request, Response } from 'express';
import PostService from '../services/PostService';

export default {
    async getAll(req: Request, res: Response) {
        try {
            // Verifique as permissões do usuário aqui, se necessário

            // Obtenha todos os comentários do banco de dados
            const post = await PostService.getAllPost();

            // Envie os comentários como resposta
            res.json({ status: 'ok', post });
        } catch (error) {
            console.error('Erro ao obter todos os comentários:', error);
            res.status(500).json({ status: 'error', message: 'Erro ao obter todos os comentários' });
        }
    },
    // Implemente outros métodos CRUD para manipulação de comentários, se necessário
};
