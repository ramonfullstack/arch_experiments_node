import type { Users } from '../../domain/model/Users.js';

import type { Ok, Err } from 'src/chassys-api/Result.js';

export class UserLoginSuccessEvent implements Ok<{ token: string }> {
  value: { token: string };
  __t = 'OK' as const;

  constructor(value: { token: string }) {
    this.value = value;
  }
  asOk() {
    return {
      value: this.value,
      __t: 'OK',
    } as Ok<{ token: string }>;
  }

  static is(v: unknown): v is UserLoginSuccessEvent {
    return v instanceof UserLoginSuccessEvent;
  }
}
export const authenticationByEmailUseCase: (
  usersWithSameEmail: Users[],
  email: string,
  password: string,
) => UserLoginSuccessEvent | Err = (_usersWithSameEmail, _email, _password) => {
  const hash = '1231231';
  return new UserLoginSuccessEvent({ token: hash });
};
