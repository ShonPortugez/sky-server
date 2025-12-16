import { Router } from 'express';
import {AuthController} from "../controllers/authController";

const router = Router();
const authController = new AuthController();

router
    .route('/:id')
    .get(authController.getUserById);

export default router;