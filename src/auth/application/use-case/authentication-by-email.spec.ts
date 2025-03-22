import { expect } from 'chai';
import { describe, it } from 'mocha';

import type { Err } from '../../../chassys-api/Result.js';
import type { Users } from '../../domain/model/Users.js';

import { authenticationByEmailUseCase, UserLoginSuccessEvent } from './authentication-by-email.js';

describe('authenticationByEmailUseCase', () => {
  const fakeUser: Users = {
    email: 'test@example.com',
    hashedPassword: 'hashed-password',
  };

  it('should return UserLoginSuccessEvent with a valid token if email and password are correct', () => {
    const result = authenticationByEmailUseCase(
      [fakeUser],
      'test@example.com',
      'hashed-password', // correct password
    );

    expect(UserLoginSuccessEvent.is(result)).to.equal(true);
    expect(result.value.token).to.be.a('string');
  });

  it('should fail if no email was found in the system', () => {
    const result = authenticationByEmailUseCase([], 'nonexistent@example.com', 'any-password');

    const isErr = (r: unknown): r is Err => typeof r === 'object' && r !== null && '__t' in r && r.__t === 'ERR';

    expect(isErr(result)).to.equal(true);
  });

  it('should fail if the password is incorrect', () => {
    const result = authenticationByEmailUseCase([fakeUser], 'test@example.com', 'wrong-password');

    const isErr = (r: unknown): r is Err => typeof r === 'object' && r !== null && '__t' in r && r.__t === 'ERR';

    expect(isErr(result)).to.equal(true);
  });
});
