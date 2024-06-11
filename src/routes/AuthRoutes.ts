import { Router } from "express";
import AuthController from "../controllers/AuthController";
import CommentController from "../controllers/CommentController";
import PostController from "../controllers/PostController";
import authMiddleware from "../middleware/authMiddleware";

const AuthRouter = Router();

AuthRouter.post("/api/auth/signin", authMiddleware ,AuthController.signIn);
AuthRouter.post("/api/auth/signup", AuthController.signUp);

// Passa pelo middleware antes de acessar.
AuthRouter.post("/api/auth/comment", authMiddleware, CommentController.getAll )
AuthRouter.post("/api/auth/post", authMiddleware, PostController.getAll)

export default AuthRouter;
