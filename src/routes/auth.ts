import { Router } from 'express';
import { authController } from '../controllers/auth';

export const authRouter = Router(); 

authRouter.post('/signup', authController.signUp);
authRouter.post('/login', authController.login);
authRouter.get('/users', authController.getUsers);