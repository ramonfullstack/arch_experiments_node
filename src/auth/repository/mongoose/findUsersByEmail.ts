import { findUsersByEmailWrapper } from '../adapter/findUsersByEmailWrapper.js';

import { findUsersByEmailMongoose } from './findUsersByEmailMongoose.js';

export const findUsersByEmail = findUsersByEmailWrapper(findUsersByEmailMongoose);
