import { withClientState } from 'apollo-link-state';
import { merge } from 'lodash';

import authUser from './authUser';

const createStateLink = cache => withClientState({
  cache,
  ...merge(authUser),
});

export default createStateLink;
