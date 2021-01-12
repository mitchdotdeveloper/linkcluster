import { DELETE, POST } from 'services/api/axios';
import {
  PostSignupResponse,
  PostLoginResponse,
  PostRefreshResponse,
} from 'types/services/api/auth';

const postSignup = (
  username: string,
  password: string
): Promise<{ auth: PostSignupResponse } | Error> =>
  POST<PostSignupResponse>(`auth/signup`, {
    username,
    password,
  })
    .then(({ data, headers }) => {
      const jwt = (headers.authorization as string)?.slice(7) ?? '';

      return {
        ...data,
        jwt,
      };
    })
    .catch((error) => error);

const postLogin = (
  username: string,
  password: string
): Promise<{ auth: PostLoginResponse } | Error> =>
  POST<PostLoginResponse>(`auth/login`, {
    username,
    password,
  })
    .then(({ data, headers }) => {
      const jwt = (headers.authorization as string)?.slice(7) ?? '';

      return {
        ...data,
        jwt,
      };
    })
    .catch((error) => error);

const deleteLogout = (userID: number): Promise<{} | Error> =>
  DELETE(`auth/logout/${userID}`)
    .then(({ data }) => data)
    .catch((error) => error);

const postRefresh = (username: string): Promise<PostRefreshResponse | Error> =>
  POST<PostRefreshResponse>(`auth/refresh`, { username })
    .then(({ data }) => data)
    .catch((error) => error);

export const AUTH = {
  postSignup,
  postLogin,
  deleteLogout,
  postRefresh,
};
