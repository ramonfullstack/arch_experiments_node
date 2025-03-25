import { Router } from 'express';

import { loginController } from './controller/loginController.js';

export const authRoute = () => {
  const router = Router();
  router.get('/login/', loginController);
  return router;
};
