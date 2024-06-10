import express from "express";
import AuthRouter from "./routes/AuthRoutes";
import UserRouter from "./routes/UserRoutes";
import { JwtPayload } from "jsonwebtoken";

const port = 3000;

const app = express();

// Middleware para tratar o corpo das requisições como JSON
app.use(express.json());

// Rotas que exigem autenticação devem vir primeiro
app.use(AuthRouter);

// Rotas públicas ou não autenticadas
app.use(UserRouter);

app.listen(port, function () {
  console.log("Servidor rodando na porta " + port);
});
