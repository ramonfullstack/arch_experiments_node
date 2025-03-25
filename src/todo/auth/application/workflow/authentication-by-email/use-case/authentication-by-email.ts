import { UserLoginSuccessEvent } from '../../../../domain/event/UserLoginSuccessEvent.js';

import type { Err } from 'src/chassys/chassys-api/Result.js';
import type { Users } from 'src/todo/auth/domain/entity/Users.js';

export const authenticationByEmailUseCase: (
  usersWithSameEmail: Users[],
  email: string,
  password: string,
) => UserLoginSuccessEvent | Err = (_usersWithSameEmail, _email, _password) => {
  const hash = '1231231';
  return new UserLoginSuccessEvent({ token: hash });
};
