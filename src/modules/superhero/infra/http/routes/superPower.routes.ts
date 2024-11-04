import { Router } from 'express';

import SuperPowerController from '../controller/SuperPowerController';

import { isAuth } from '@/shared/infra/http/middlewares/IsAuth';

const superPowerRouter = Router();
const superPowerController = new SuperPowerController();

superPowerRouter.post('/create', isAuth, superPowerController.createSuperPower);
superPowerRouter.get('/', isAuth, superPowerController.listAll);
superPowerRouter.get('/:id', isAuth, superPowerController.findById);

export { superPowerRouter };
