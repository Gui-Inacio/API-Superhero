import { Router } from 'express';

import '../../../../../shared/container';
import ColourController from '../controller/ColoursController';

import { isAuth } from '@/shared/infra/http/middlewares/IsAuth';

const colourRouter = Router();
const colourController = new ColourController();

colourRouter.post('/create', colourController.createColour);
colourRouter.get('/search/:id', isAuth, colourController.findById);
colourRouter.get('/', isAuth, colourController.listAll);
colourRouter.delete('/delete/:id', isAuth, colourController.delete);

export { colourRouter };
