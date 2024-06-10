import { Router } from "express";
import AuthController from "../controllers/AuthController";
import CommentController from "../controllers/CommentController";
import PostController from "../controllers/PostController";
import { authenticateJWT } from "../middleware/authMiddleware";

const AuthRouter = Router();

AuthRouter.post("/api/auth/signin", AuthController.signIn);
AuthRouter.post("/api/auth/signup", AuthController.signUp);

// Passa pelo middleware antes de acessar.
AuthRouter.post("/api/auth/comment", authenticateJWT, CommentController.getAll )
AuthRouter.post("/api/auth/post", authenticateJWT, PostController.getAll)

export default AuthRouter;
