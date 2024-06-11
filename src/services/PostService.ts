import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

class PostService {
    constructor() {}

    async createComment(commentData: Prisma.PostCreateInput) {
        try {
            const newPost = await prisma.post.create({
                data: commentData,
            });
            return newPost;
        } catch (error) {
            console.error("Erro ao criar comentário:", error);
            throw error;
        }
    }

    async getAllPost() {
        try {
            // Use o Prisma para recuperar todos os comentários do banco de dados
            const post = await prisma.post.findMany();

            return post;
        } catch (error) {
            console.error('Erro ao obter todos os comentários:', error);
            throw error;
        }
    }
}

export default new PostService();
