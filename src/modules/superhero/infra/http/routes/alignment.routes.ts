import { Router } from 'express';

import AlignmentController from '../controller/AlignmentController';

import { isAuth } from '@/shared/infra/http/middlewares/IsAuth';

const alignmentRouter = Router();
const alignmentController = new AlignmentController();

alignmentRouter.post('/create', alignmentController.createAlignment);
alignmentRouter.get('/', alignmentController.listAll, isAuth);
alignmentRouter.get('/:id', alignmentController.findById, isAuth);

export { alignmentRouter };
