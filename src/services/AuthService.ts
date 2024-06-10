import { Prisma, PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const secretKey = 'chave';  
const prisma = new PrismaClient();

class AuthService {
    constructor() {}

    async signIn(email: string, password: string) {
        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                throw new Error('Usuário não encontrado');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Senha inválida');
            }

            const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
            return { token, user };
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async signUp(user: Prisma.UserCreateInput) {
        try {
            const newUser = await prisma.user.create({ data: user });
            return newUser;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async signOut() {
       
    }

    async authenticate(token: string) {
        try {
            return jwt.verify(token, secretKey);
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default new AuthService();
