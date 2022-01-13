import Router from "express";
import { AuthController } from "../controllers/auth.controller";
const router = Router();

router.post('/auth/register', AuthController.register);

export{router}
