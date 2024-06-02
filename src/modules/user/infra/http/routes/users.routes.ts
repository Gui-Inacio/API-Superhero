import { Router } from 'express';

import UsersController from './../controller/UsersController';
import '../../../../../shared/container';

const userRouter = Router();
const userController = new UsersController();

userRouter.post('/create', userController.createUser);

export { userRouter };