import { stateProps } from "./AppState";
import {
  SET_SELECT_CONTACTS_MODAL,
  SET_SHARE_MODAL,
  SET_INVITED_CONTACTS,
  UPDATE_CONTACTS_ACCESS_LEVEL,
} from "./ActionTypes";

const reducer = (
  state: stateProps,
  action: {
    type: string;
    payload: object | string | number | boolean | Array<any> | any;
  }
) => {
  switch (action.type) {
    case SET_SHARE_MODAL: {
      return { ...state, shareModalOpen: action.payload };
    }

    case SET_SELECT_CONTACTS_MODAL: {
      return { ...state, selectContactsModalOpen: action.payload };
    }

    case SET_INVITED_CONTACTS: {
      return {
        ...state,
        invitedContacts: {
          uid: [...state.invitedContacts.uid, ...action.payload.uid],
          contacts: [
            ...state.invitedContacts.contacts,
            ...action.payload.contacts,
          ],
        },
      };
    }

    case UPDATE_CONTACTS_ACCESS_LEVEL: {
      return {
        ...state,
        invitedContacts: {
          uid: state.invitedContacts.uid,
          contacts: action.payload,
        },
      };
    }

    default: {
      return state;
    }
  }
};
export default reducer;
