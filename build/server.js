"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const port = 3000;
const app = (0, express_1.default)();
// Middleware para tratar o corpo das requisições como JSON
app.use(express_1.default.json());
// Rotas que exigem autenticação devem vir primeiro
app.use(AuthRoutes_1.default);
// Rotas públicas ou não autenticadas
app.use(UserRoutes_1.default);
app.listen(port, function () {
    console.log("Servidor rodando na porta " + port);
});
