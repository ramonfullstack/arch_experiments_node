import { z } from 'zod';

import type { IFindUsersByEmail } from './Ifind-users-by-email.js';

import { wrapRepository } from 'src/chassys/chassys-domain/wrapRepository.js';

const userDto = z.object({
  email: z.string(),
  hashedPassword: z.string(),
});
export const findUsersByEmailWrapper: (fn: (email: string) => Promise<unknown>) => IFindUsersByEmail =
  wrapRepository(userDto);
