import { Router } from 'express';

import PublisherController from '../controller/PublisherController';
import '../../../../../shared/container';

import { isAuth } from '@/shared/infra/http/middlewares/IsAuth';

const publisherRouter = Router();
const publisherController = new PublisherController();

publisherRouter.post('/create', publisherController.createPublisher);
publisherRouter.get('/', isAuth, publisherController.listAll);
publisherRouter.get('/search/:id', isAuth, publisherController.findById);
publisherRouter.put('/update/:id', isAuth, publisherController.update);
publisherRouter.delete('/delete/:id', isAuth, publisherController.delete);

export { publisherRouter };
