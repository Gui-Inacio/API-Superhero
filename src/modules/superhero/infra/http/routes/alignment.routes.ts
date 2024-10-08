import { Router } from 'express';

import AlignmentController from '../controller/AlignmentController';

import { isAuth } from '@/shared/infra/http/middlewares/IsAuth';

const alignmentRouter = Router();
const alignmentController = new AlignmentController();

alignmentRouter.post('/create', alignmentController.createAlignment);
alignmentRouter.get('/', isAuth, alignmentController.listAll);
alignmentRouter.get('/:id', isAuth, alignmentController.findById);
alignmentRouter.put('/update/:id', isAuth, alignmentController.updateAlignment);
alignmentRouter.delete('/delete/:id', isAuth, alignmentController.delete);

export { alignmentRouter };
