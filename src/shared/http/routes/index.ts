import { Router } from 'express';

const routes = Router();

// routes.get('/', (request, response) => {
//   return response.json({ message: 'Hello Dev!' });
// });

routes.get('/', (_req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date(),
    serviceName: process.env.SERVICE_NAME,
  };

  res.status(200).send(data);
});

export default routes;
