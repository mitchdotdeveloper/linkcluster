import {
  GET_LINKS_FAILURE,
  GET_LINKS_REQUEST,
  GET_LINKS_SUCCESS,
} from 'services/api/links/actions';
import { BasicResponseError } from 'types/services/api/common';
import { GetLinksResponse } from 'types/services/api/links';

export type Link = {
  userID: number;
  linkID: number;
  linkTitle: string;
  link: string;
};

export type LinksStore = {
  links: Link[];
  error: Error | null;
};

export type GetLinksRequestAction = {
  type: typeof GET_LINKS_REQUEST;
  payload: {
    userID: number;
  };
};
export type GetLinksSuccessAction = {
  type: typeof GET_LINKS_SUCCESS;
  payload: { links: GetLinksResponse };
};
export type GetLinksFailureAction = {
  type: typeof GET_LINKS_FAILURE;
  payload: BasicResponseError;
};

export type LinksActionTypes =
  | GetLinksRequestAction
  | GetLinksSuccessAction
  | GetLinksFailureAction;
