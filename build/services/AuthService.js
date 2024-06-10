"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const secretKey = 'chave';
const prisma = new client_1.PrismaClient();
class AuthService {
    constructor() { }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma.user.findUnique({ where: { email } });
                if (!user) {
                    throw new Error('Usuário não encontrado');
                }
                const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    throw new Error('Senha inválida');
                }
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
                return { token, user };
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    signUp(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield prisma.user.create({ data: user });
                return newUser;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    signOut() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    authenticate(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return jsonwebtoken_1.default.verify(token, secretKey);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
}
exports.default = new AuthService();
