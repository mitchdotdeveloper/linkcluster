import { combineReducers } from 'redux';
import { User } from 'services/store/reducers/user';
import { Auth } from 'services/store/reducers/auth';
import { Links } from 'services/store/reducers/links';

export const rootReducer = combineReducers({ User, Auth, Links });

export type RootState = ReturnType<typeof rootReducer>;
