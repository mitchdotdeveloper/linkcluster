import produce from 'immer';
import {
  GET_LINKS_FAILURE,
  GET_LINKS_REQUEST,
  GET_LINKS_SUCCESS,
} from 'services/api/links/actions';
import { LinksActionTypes, LinksStore } from 'types/services/store/links';

const initialState: LinksStore = {
  links: [],
  error: null,
};

export const Links = (state = initialState, action: LinksActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_LINKS_REQUEST: {
        return state;
      }
      case GET_LINKS_SUCCESS: {
        const { links } = action.payload;

        draft.links = links;
        draft.error = null;

        break;
      }
      case GET_LINKS_FAILURE: {
        const { error } = action.payload;

        draft.error = error;

        break;
      }
    }
  });
