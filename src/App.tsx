import "./App.css";
import { useRef, useState } from "react";
import Share from "./components/Share";
import { Modal, ModalContent } from "@chakra-ui/react";
import SelectContacts from "./components/SelectContacts";
import { useAppContext } from "./context/AppState";

function App() {
  const { selectContactsModalOpen, setSelectContactsModalState }: any =
    useAppContext();

  const finalRef = useRef(null);

  return (
    <div className="App container mx-auto my-6">
      {/* Contains the main Share button and opens a popover 
      (which is the first screen of the widget) upon clicking it */}
      <div className="flex justify-center mt-16">
        <Share />
      </div>
      {/* Shows up when a user clicks on invite input field for them
       to choose what all users and groups to select */}
      <Modal
        finalFocusRef={finalRef}
        isOpen={selectContactsModalOpen}
        onClose={() => {
          let shareScreen: HTMLElement | null =
            document.getElementById("share-screen");
          if (shareScreen) shareScreen.focus();

          setSelectContactsModalState(false);
        }}
      >
        <ModalContent>
          <SelectContacts />
        </ModalContent>
      </Modal>
    </div>
  );
}

export default App;
