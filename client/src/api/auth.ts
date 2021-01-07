import { post, remove } from './axios';
import { User } from './users';

export const signup = (username: string, password: string) =>
  post<{ username: string }>('auth/signup', { username, password })
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err);
      return null;
    });

export const login = (username: string, password: string) =>
  post<{ user: Omit<User, 'password' | 'salt'> }>('auth/login', {
    username,
    password,
  })
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err);
      return null;
    });

export const logout = () =>
  remove('auth/logout')
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err);
      return null;
    });
