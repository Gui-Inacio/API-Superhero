import { Router } from 'express';

import '../../../../../shared/container';
import RaceController from '../controller/RaceController';

import { isAuth } from '@/shared/infra/http/middlewares/IsAuth';

const raceRouter = Router();
const raceController = new RaceController();

raceRouter.post('/create', isAuth, raceController.createRace);
raceRouter.get('/', isAuth, raceController.listAll);
raceRouter.delete('/delete/:id', isAuth, raceController.delete);
raceRouter.put('/update/:id', isAuth, raceController.update);
raceRouter.get('/search/:id', isAuth, raceController.findById);

export { raceRouter };
