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
      <Modal
        finalFocusRef={finalRef}
        isOpen={selectContactsModalOpen}
        onClose={() => {
          let ShareScreen: HTMLElement | null = document.getElementById(
            "share-screen"
          ) as HTMLElement;
          if (ShareScreen) ShareScreen.focus();

          setSelectContactsModalState(false);
        }}
      >
        <ModalContent>
          <SelectContacts />
        </ModalContent>
      </Modal>
      <div className="flex justify-center mt-16">
        <Share />
      </div>
    </div>
  );
}

export default App;
