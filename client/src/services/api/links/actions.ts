import { GetLinksResponse } from 'types/services/api/links';
import { LinksActionTypes } from 'types/services/store/links';

export const GET_LINKS_REQUEST = 'LINKS/GET_LINKS_REQUEST';
export const GET_LINKS_SUCCESS = 'LINKS/GET_LINKS_SUCCESS';
export const GET_LINKS_FAILURE = 'LINKS/GET_LINKS_FAILURE';

export const getLinks = (userID: number): LinksActionTypes => ({
  type: GET_LINKS_REQUEST,
  payload: { userID },
});

export const getLinksSuccess = (links: GetLinksResponse): LinksActionTypes => ({
  type: GET_LINKS_SUCCESS,
  payload: { links },
});

export const getLinksFailure = (error: Error): LinksActionTypes => ({
  type: GET_LINKS_FAILURE,
  payload: { error },
});
