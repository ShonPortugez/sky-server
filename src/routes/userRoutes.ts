import { Router } from 'express';
import {AuthController} from "../controllers/authController";
import {UserMiddleware} from "../middleware/userMiddleware";
import {UserController} from "../controllers/usersController";

const router = Router();
const userController = new UserController();

router
    .route('/:id')
    .get(UserMiddleware, userController.getUserById)
    .post(userController.createUser)
    .put(userController.updateUser);

export default router;