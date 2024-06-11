import { Prisma, PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const secretKey = 'chave';


class AuthService {
    private prisma: PrismaClient;
    constructor() {
        this.prisma = new PrismaClient();
    }

    async signIn(email: string, password: string) {
        try {
            const user = await this.prisma.user.findUnique({ where: { email } });
            if (!user) {
                throw new Error('Usuário não encontrado');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Senha inválida');
            }

            const token = jwt.sign({ id: user.id, email: user.email }, secretKey);
            return { token: token, user: user };
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async signUp(name: string, email: string, password: string) {
        return await this.prisma.user.create({ data: { name: name, email: email, password: password } })
    }
    
}
export default new AuthService();

export const genJwt = (email: string, id: Number) => {
    return jwt.sign({email: email, id: id}, secret);
  }
  
  export const verifyJwt = (token: string) => jwt.verify(token, secret);
  
  const secret = (process.env.JWT_SECRET as string);

  export const hashPass = async (password: string) => {
     const saltRounds = 10;
     const hashedPassword = await bcrypt.hash(password, saltRounds);
     return hashedPassword;
  }