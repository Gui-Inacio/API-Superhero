import { Router } from 'express';

import '../../../../../shared/container';
import GendersController from '../controller/GendersController';

import { isAuth } from '@/shared/infra/http/middlewares/IsAuth';

const genderRouter = Router();
const genderController = new GendersController();

genderRouter.post('/create', genderController.createGender);
genderRouter.get('/search/:id', isAuth, genderController.findById);
genderRouter.get('/', isAuth, genderController.listAll);
genderRouter.delete('/delete/:id', isAuth, genderController.delete);
genderRouter.put('/update/:id', isAuth, genderController.updateGender);

export { genderRouter };
