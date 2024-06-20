import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';
import '../container';
import express, { Router } from 'express';

import { userRouter } from '../../modules/user/infra/http/routes/users.routes';
import { ErrorRequestHandler } from '../errors/error-handler';

import routes from './routes';

import { AuthenticationRouter } from '@/modules/authentication/infra/http/routes/authentication.routes';

const app = express();
const router = Router();

app.use(cors());
app.use(routes);
app.use(express.json());

app.use('/users', userRouter);
app.use('/login', AuthenticationRouter);
app.use(ErrorRequestHandler);
// app.use((error: Error, request: Request, response:Response, next: NextFunction)=> {
//   if (error instanceof AppError)
// })

app.listen(3333, () => {
  console.log('Server started on port 3333! ');
});
