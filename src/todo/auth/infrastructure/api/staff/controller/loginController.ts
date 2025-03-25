import type { Request, Response } from 'express';

import { findUsersByEmail } from '../../../repository/find-user-by-email/mongoose/findUsersByEmail.js';
import { loginRequestDto } from '../../shared/serializer/loginRequestDto.js';

import { isError } from 'src/chassys/chassys-api/Result.js';
import { authenticationByEmailWorkflow } from 'src/todo/auth/application/workflow/authentication-by-email/authentication-by-email-workflow.js';

export const loginController = async (req: Request, res: Response): Promise<void> => {
  const loginRequestParsed = loginRequestDto(req);
  if (isError(loginRequestParsed)) {
    res.json({ err: loginRequestParsed.errors });
    return;
  }
  const { email, password } = loginRequestParsed.value;
  const authResult = await authenticationByEmailWorkflow({ findUsersByEmail }, email, password);

  if (isError(authResult)) {
    res.json({ err: authResult.errors });
    return;
  }
  res.json({ token: authResult.value.token });
};
