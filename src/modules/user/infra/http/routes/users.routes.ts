import { Router } from 'express';

import '../../../../../shared/container';
import UsersController from './../controller/UsersController';

import { isAuth } from '@/shared/infra/http/middlewares/IsAuth';

const userRouter = Router();
const userController = new UsersController();

userRouter.post('/create', userController.createUser);
userRouter.get('/search/:id', isAuth, userController.findById);
userRouter.get('/email/:email', isAuth, userController.findByEmail);
userRouter.get('/', isAuth, userController.listAll);
//userRouter.get('/logout');

export { userRouter };
