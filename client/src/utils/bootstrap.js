import {queryCache} from 'react-query'
import * as auth from './auth-client'


async function bootstrapAppData() {
  let appData = {user: null};
  if (auth.isLoggedIn()) {
    let user = await Promise.all([
      auth.getUser(),
    ]);
    appData = {user};
  }
  queryCache.setQueryData('get-users', appData);
  return appData
}

export {bootstrapAppData}
