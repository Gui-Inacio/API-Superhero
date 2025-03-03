import { Router } from 'express';

import '../../../../../shared/container';
import SuperHeroController from '../controller/SuperHeroController';

import { isAuth } from '@/shared/infra/http/middlewares/IsAuth';

const superHeroRouter = Router();
const superHeroController = new SuperHeroController();

superHeroRouter.post('/create', isAuth, superHeroController.create);
superHeroRouter.get('/', isAuth, superHeroController.listAll);
superHeroRouter.get('/:id', isAuth, superHeroController.findById);
superHeroRouter.delete('/delete/:id', isAuth, superHeroController.delete);
superHeroRouter.put('/update/:id', isAuth, superHeroController.update);
superHeroRouter.post('/battle', isAuth, superHeroController.createBattle);

export { superHeroRouter };
