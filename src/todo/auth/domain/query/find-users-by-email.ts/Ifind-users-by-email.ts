import type { Users } from '../../entity/Users.js';

export type IFindUsersByEmail = (email: string) => Promise<Users[]>;
