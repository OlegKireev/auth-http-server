import { Router } from 'express';
import { authController } from '../controllers/auth';

export const authRouter = Router(); 

authRouter.get('/sign-up', authController.signUp);
authRouter.get('/login', authController.login);
authRouter.get('/users', authController.getUsers);