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
exports.hashPass = exports.verifyJwt = exports.genJwt = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const secretKey = 'chave';
class AuthService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.prisma.user.findUnique({ where: { email } });
                if (!user) {
                    throw new Error('Usuário não encontrado');
                }
                const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    throw new Error('Senha inválida');
                }
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, secretKey);
                return { token: token, user: user };
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    signUp(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.user.create({ data: { name: name, email: email, password: password } });
        });
    }
}
exports.default = new AuthService();
const genJwt = (email, id) => {
    return jsonwebtoken_1.default.sign({ email: email, id: id }, secret);
};
exports.genJwt = genJwt;
const verifyJwt = (token) => jsonwebtoken_1.default.verify(token, secret);
exports.verifyJwt = verifyJwt;
const secret = process.env.JWT_SECRET;
const hashPass = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
    return hashedPassword;
});
exports.hashPass = hashPass;
