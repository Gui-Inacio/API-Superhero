import { Router } from 'express';

import HeroAttributeController from '../controller/HeroAttributeController';

import { isAuth } from '@/shared/infra/http/middlewares/IsAuth';

const heroAttributeRouter = Router();
const heroAttributeController = new HeroAttributeController();

heroAttributeRouter.post(
  '/create',
  isAuth,
  heroAttributeController.createHeroAttribute,
);
heroAttributeRouter.get('/', isAuth, heroAttributeController.listAll);
heroAttributeRouter.get(
  '/search/:id',
  isAuth,
  heroAttributeController.findByID,
);
heroAttributeRouter.delete(
  '/delete/:id',
  isAuth,
  heroAttributeController.delete,
);
heroAttributeRouter.put(
  '/update/:id',
  isAuth,
  heroAttributeController.updateHeroAttribute,
);

export { heroAttributeRouter };
