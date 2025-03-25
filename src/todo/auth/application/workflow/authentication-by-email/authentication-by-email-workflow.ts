import { UserLoginSuccessEvent } from '../../../domain/event/UserLoginSuccessEvent.js';

import { authenticationByEmailUseCase } from './use-case/authentication-by-email.js';

import { Ok, Err } from 'src/chassys/chassys-api/Result.js';
import type { IFindUsersByEmail } from 'src/todo/auth/domain/query/find-users-by-email.ts/Ifind-users-by-email.js';

export const authenticationByEmailWorkflow: (
  dependencies: { findUsersByEmail: IFindUsersByEmail },
  email: string,
  password: string,
) => Promise<Ok<{ token: string }> | Err> = async ({ findUsersByEmail }, email, password) => {
  const usersWithSameEmail = await findUsersByEmail(email);

  const userLoginEvent = authenticationByEmailUseCase(usersWithSameEmail, email, password);

  // Selector to have command with side effects like saving sessions, etc
  if (UserLoginSuccessEvent.is(userLoginEvent)) {
    return userLoginEvent.asOk();
  }
  return userLoginEvent;
};
