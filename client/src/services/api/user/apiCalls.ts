import { GET } from 'services/api/axios';
import { GetUserResponse } from 'types/services/api/user';

const getUser = (
  username: string
): Promise<{ user: GetUserResponse } | Error> =>
  GET<{ user: GetUserResponse }>(`users/${username}`)
    .then(({ data }) => data)
    .catch((error) => error);

export const USER = {
  getUser,
};
