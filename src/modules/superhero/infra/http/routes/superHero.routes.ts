import { Router } from 'express';

import '../../../../../shared/container';
import SuperHeroController from '../controller/SuperHeroController';

import { isAuth } from '@/shared/infra/http/middlewares/IsAuth';

const superHeroRouter = Router();
const superHeroController = new SuperHeroController();

superHeroRouter.post('/create', isAuth, superHeroController.create);
superHeroRouter.get('/', isAuth, superHeroController.listAll);
superHeroRouter.get('/:id', isAuth, superHeroController.findById);

export { superHeroRouter };
