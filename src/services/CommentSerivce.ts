import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

class CommentService {
    constructor() {}

    async createComment(commentData: Prisma.CommentCreateInput) {
        try {
            const newPost = await prisma.comment.create({
                data: commentData,
            });
            return newPost;
        } catch (error) {
            console.error("Erro ao criar comentário:", error);
            throw error;
        }
    }

    async getAllComments() {
        try {
            // Use o Prisma para recuperar todos os comentários do banco de dados
            const comments = await prisma.comment.findMany();

            return comments;
        } catch (error) {
            console.error('Erro ao obter todos os comentários:', error);
            throw error;
        }
    }
}

export default new CommentService();
