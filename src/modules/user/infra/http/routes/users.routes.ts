import { Router } from 'express';

import UsersController from './../controller/UsersController';

const userRouter = Router();
const userController = new UsersController();

userRouter.post('/create', userController);

//export default userRoutes;
