"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const CommentController_1 = __importDefault(require("../controllers/CommentController"));
const PostController_1 = __importDefault(require("../controllers/PostController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const AuthRouter = (0, express_1.Router)();
AuthRouter.post("/api/auth/signin", AuthController_1.default.signIn);
AuthRouter.post("/api/auth/signup", AuthController_1.default.signUp);
// Passa pelo middleware antes de acessar.
AuthRouter.post("/api/auth/comment", authMiddleware_1.authenticateJWT, CommentController_1.default.getAll);
AuthRouter.post("/api/auth/post", authMiddleware_1.authenticateJWT, PostController_1.default.getAll);
exports.default = AuthRouter;
