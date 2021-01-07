import { get, patch, post } from 'api/axios';

export type Link = {
  userID: number;
  linkID: number;
  linkTitle: string;
  link: string;
};

export const getLinks = (userID: number) =>
  get<{ links: Link[] }>(`links/${userID}`)
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err);
      return null;
    });

export const addLink = ({ userID, linkTitle, link }: Omit<Link, 'linkID'>) =>
  post<{ link: Link }>('links/', {
    userID,
    linkTitle,
    link,
  })
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err);
      return null;
    });

export const updateLink = ({ linkID, linkTitle, link }: Omit<Link, 'userID'>) =>
  patch<{ linkID: Link['linkID'] }>('links/', { linkID, linkTitle, link })
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err);
      return null;
    });
