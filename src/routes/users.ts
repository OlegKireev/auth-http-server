import { Router } from 'express';
import { userController } from '../controllers';
import { authMiddleware, roleMiddlewareCreator } from '../middleware';

export const userRouter = Router(); 

userRouter.get('/users', authMiddleware, roleMiddlewareCreator(['ADMIN']), userController.getUsers);