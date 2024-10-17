import { Router } from 'express';

import HeroAttributeController from '../controller/HeroAttributeController';

import { isAuth } from '@/shared/infra/http/middlewares/IsAuth';

const heroAttributeRouter = Router();
const heroAttributeController = new HeroAttributeController();

heroAttributeRouter.post(
  '/create',
  heroAttributeController.createHeroAttribute,
);
heroAttributeRouter.get('/', isAuth, heroAttributeController.listAll);

export { heroAttributeRouter };
