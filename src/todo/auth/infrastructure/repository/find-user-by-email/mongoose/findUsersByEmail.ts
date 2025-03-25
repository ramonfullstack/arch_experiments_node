import { findUsersByEmailMongoose } from './findUsersByEmailMongoose.js';

import { findUsersByEmailWrapper } from 'src/todo/auth/domain/query/find-users-by-email.ts/findUsersByEmailWrapper.js';

export const findUsersByEmail = findUsersByEmailWrapper(findUsersByEmailMongoose);
