import { GET } from 'services/api/axios';
import { GetLinksResponse } from 'types/services/api/links';

const getLinks = (
  userID: number
): Promise<{ links: GetLinksResponse } | Error> =>
  GET<{ links: GetLinksResponse }>(`links/${userID}`)
    .then(({ data }) => data)
    .catch((error) => error);

export const LINKS = {
  getLinks,
};
