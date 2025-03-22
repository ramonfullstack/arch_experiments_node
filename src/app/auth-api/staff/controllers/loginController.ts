import type { Request, Response } from 'express';

import { loginRequestDto } from '../serializers/loginRequestDto.js';

import { isError } from 'src/chassys/chassys-api/Result.js';
import { authenticationByEmailWorkflow } from 'src/context/auth/application/authenticationByEmailWorkflow.js';

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const loginRequestParsed = loginRequestDto(req);
  if (isError(loginRequestParsed)) {
    res.json({ err: loginRequestParsed.errors });
    return;
  }
  const { email, password } = loginRequestParsed.value;
  const authResult = await authenticationByEmailWorkflow(email, password);

  if (isError(authResult)) {
    res.json({ err: authResult.errors });
    return;
  }
  res.json({ token: authResult.value.token });
};
