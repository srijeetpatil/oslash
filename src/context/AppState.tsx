import React, { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
import {
  SET_SHARE_MODAL,
  SET_SELECT_CONTACTS_MODAL,
  SET_INVITED_CONTACTS,
  UPDATE_CONTACTS_ACCESS_LEVEL,
} from "./ActionTypes";

export interface stateProps {
  shareModalOpen: boolean;
  selectContactsModalOpen: boolean;
  invitedContacts: {
    uid: Array<string>;
    contacts: Array<{
      name: string;
      image?: string;
      id: string;
      access: string;
    }>;
  };
}

export const AppContext = createContext({});

export function AppState({ children }: { children: React.ReactNode }) {
  let initialValues: stateProps = {
    shareModalOpen: false,
    selectContactsModalOpen: false,
    invitedContacts: {
      uid: ["Everyone"],
      contacts: [
        {
          name: "Everyone at OSlash",
          image: "/assets/oslash-logo.png",
          access: "No access",
          id: "Everyone",
        },
      ],
    },
  };

  const [state, dispatch] = useReducer(reducer, initialValues);

  // Handler for the initial modal that opens when share is clicked
  const setShareModalState = (value: boolean) => {
    dispatch({
      type: SET_SHARE_MODAL,
      payload: value,
    });
  };

  // Handler for the modal that opens after clicking invite input field
  const setSelectContactsModalState = (value: boolean) => {
    dispatch({
      type: SET_SELECT_CONTACTS_MODAL,
      payload: value,
    });
  };

  // Used to set all the contacts that will be sent an invite/given some access
  const setInvitedContacts = (
    selectedContacts: Array<{ name: string; image?: string; id: string }>,
    access: string
  ) => {
    let newContactsArray: Array<{
      name: string;
      image?: string;
      access: string;
    }> = [];
    let newUIDArray: Array<string> = [];

    const { uid } = state.invitedContacts;

    selectedContacts.forEach((contact, index) => {
      if (!uid.includes(contact.id)) {
        newUIDArray.push(contact.id);

        newContactsArray.push({
          name: contact.name,
          image: contact.image,
          access: access,
        });
      }
    });

    dispatch({
      type: SET_INVITED_CONTACTS,
      payload: { uid: newUIDArray, contacts: newContactsArray },
    });
  };

  const updateContactsAccessLevel = (access: string, index: number) => {
    let newContactsArray: Array<{
      name: string;
      image?: string;
      id: string;
      access: string;
    }> = state.invitedContacts.contacts;
    newContactsArray[index].access = access;

    dispatch({ type: UPDATE_CONTACTS_ACCESS_LEVEL, payload: newContactsArray });
  };

  // All the props including the action handlers
  let sharedState = {
    shareModalOpen: state.shareModalOpen,
    selectContactsModalOpen: state.selectContactsModalOpen,
    invitedContacts: state.invitedContacts,
    setShareModalState,
    setSelectContactsModalState,
    setInvitedContacts,
    updateContactsAccessLevel,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
