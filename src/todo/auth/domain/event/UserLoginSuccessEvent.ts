import type { Ok } from 'src/chassys/chassys-api/Result.js';

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
