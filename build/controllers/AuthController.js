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
const AuthService_1 = __importDefault(require("../services/AuthService"));
const BcryptUtils_1 = require("../utils/BcryptUtils");
class AuthController {
    constructor() { }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name, password } = req.body;
            if (!email || !name || !password) {
                res.status(400).json({ status: "error", message: "Falta parâmetros" });
                return;
            }
            const hashPassword = yield (0, BcryptUtils_1.generateHash)(password);
            if (!hashPassword) {
                res.status(500).json({ status: "error", message: "Erro ao criptografar senha ..." });
                return;
            }
            try {
                const newUser = yield AuthService_1.default.signUp({ name, email, password: hashPassword });
                res.status(201).json({ status: "ok", newUser });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ status: "error", message: error.message });
                }
                else {
                    res.status(500).json({ status: "error", message: "Erro desconhecido" });
                }
            }
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ status: "error", message: "Falta parâmetros" });
                return;
            }
            try {
                const result = yield AuthService_1.default.signIn(email, password);
                if (!result) {
                    res.status(401).json({ status: "error", message: "Credenciais inválidas" });
                    return;
                }
                res.json({ status: "ok", token: result.token, user: result.user });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ status: "error", message: error.message });
                }
                else {
                    res.status(500).json({ status: "error", message: "Erro desconhecido" });
                }
            }
        });
    }
    signOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // A implementação de signOut depende de como você deseja gerenciar a sessão/tokens
            res.json({ status: "ok", message: "Logout realizado com sucesso" });
        });
    }
}
exports.default = new AuthController();
