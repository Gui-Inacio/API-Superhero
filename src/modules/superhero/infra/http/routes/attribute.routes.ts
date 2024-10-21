import { Router } from 'express';

import AttributeController from '../controller/AttributeController';

import { isAuth } from '@/shared/infra/http/middlewares/IsAuth';

const attributeRouter = Router();
const attributeController = new AttributeController();

attributeRouter.post('/create', isAuth, attributeController.createAttribute);
attributeRouter.get('/', isAuth, attributeController.listAll);
attributeRouter.get('/search/:id', isAuth, attributeController.findById);
attributeRouter.put('/update/:id', isAuth, attributeController.updateAttribute);
attributeRouter.delete('/delete/:id', isAuth, attributeController.delete);

export { attributeRouter };
