import cors, { CorsOptions } from 'cors';
import express, { Application } from 'express';

import { authRoute } from 'src/auth-api/staff/index.js';

const routes = (app: Application): void => {
  app.use('/auth', authRoute());
  // app.use('/api/tutorials', tutorialRoutes);
};
const preMiddlewares = (app: Application): void => {
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:8081',
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
export const applyRoutes = (): Application => {
  const app: Application = express();
  preMiddlewares(app);
  routes(app);
  return app;
};
