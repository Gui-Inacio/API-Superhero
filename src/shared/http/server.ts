import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';
import '../container';
import express from 'express';

import { userRouter } from '../../modules/user/infra/http/routes/users.routes';
import { ErrorRequestHandler } from '../errors/error-handler';

import routes from './routes';

import { AuthenticationRouter } from '@/modules/authentication/infra/http/routes/authentication.routes';
import { colourRouter } from '@/modules/superhero/infra/http/routes/colours.routes';
import { genderRouter } from '@/modules/superhero/infra/http/routes/genders.routes';
import { raceRouter } from '@/modules/superhero/infra/http/routes/race.routes';
import { alignmentRouter } from '@/modules/superhero/infra/http/routes/alignment.routes';
import { publisherRouter } from '@/modules/superhero/infra/http/routes/publisher.routes';
import { attributeRouter } from '@/modules/superhero/infra/http/routes/attribute.routes';
import { heroAttributeRouter } from '@/modules/superhero/infra/http/routes/heroAttribute.routes';
import { superPowerRouter } from '@/modules/superhero/infra/http/routes/superPower.routes';

const app = express();
//const router = Router();

app.use(cors());
app.use(routes);
app.use(express.json());

app.use('/users', userRouter);
app.use('/login', AuthenticationRouter);
app.use('/colour', colourRouter);
app.use('/gender', genderRouter);
app.use('/race', raceRouter);
app.use('/alignment', alignmentRouter);
app.use('/publisher', publisherRouter);
app.use('/attribute', attributeRouter);
app.use('/heroAttribute', heroAttributeRouter);
app.use('/superPower', superPowerRouter);

app.use(ErrorRequestHandler);
// app.use((error: Error, request: Request, response:Response, next: NextFunction)=> {
//   if (error instanceof AppError)
// })

app.listen(3333, () => {
  console.log('Server started on port 3333! ');
});
