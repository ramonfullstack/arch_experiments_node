import { findUsersByEmail } from '../repository/mongoose/findUsersByEmail.js';

import { authenticationByEmailUseCase, UserLoginSuccessEvent } from './use-case/authentication-by-email.js';

import type { Ok, Err } from 'src/chassys/chassys-api/Result.js';

export const authenticationByEmailWorkflow: (
  email: string,
  password: string,
) => Promise<Ok<{ token: string }> | Err> = async (email, password) => {
  const usersWithSameEmail = await findUsersByEmail(email);

  const userLoginEvent = authenticationByEmailUseCase(usersWithSameEmail, email, password);

  // Selector to have command with side effects like saving sessions, etc
  if (UserLoginSuccessEvent.is(userLoginEvent)) {
    return userLoginEvent.asOk();
  }
  return userLoginEvent;
};
