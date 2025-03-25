import { z } from 'zod';

import type { Users } from '../../../../auth/domain/entity/Users.js';

import { wrapRepository } from 'src/chassys/chassys-domain/wrapRepository.js';

const userDto = z.object({
  email: z.string(),
  hashedPassword: z.string(),
});
export const findUsersByEmailWrapper: (fn: (email: string) => Promise<unknown>) => (email: string) => Promise<Users[]> =
  wrapRepository(userDto);
