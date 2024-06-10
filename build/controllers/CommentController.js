"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getAll(req, res) {
        // Verifique as permissões do usuário aqui
        const user = req.user;
        // Obtenha todos os comentários
        res.send('Todos os comentários');
    },
    // Implemente outros métodos CRUD para manipulação de comentários
};
