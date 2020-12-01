import { get } from './axios';

export type User = {
  userID: number;
  username: string;
  password: string;
  salt: string;
};

export const getUser = (username: string) =>
  get<{ user: Omit<User, 'password' | 'salt'> }>(`users/${username}`)
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err);
      return null;
    });
