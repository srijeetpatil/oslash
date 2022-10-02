import { memo } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import Header from "./Share/Header";
import Footer from "./Share/Footer";
import { accessLevels } from "../utilities/Defaults";
import { useAppContext } from "../context/AppState";
import InviteButton from "./Share/InviteButton";

const Share = () => {
  const {
    invitedContacts,
    updateContactsAccessLevel,
    shareModalOpen,
    setShareModalState,
    selectContactsModalOpen,
    setSelectContactsModalState,
  }: any = useAppContext();

  // Used to change the access of any individual user or group
  const setAccess = (access: string, index: number) => {
    updateContactsAccessLevel(access, index);
  };

  return (
    <Popover
      styleConfig={{
        maxWidth: "unset",
        width: "unset",
      }}
      isOpen={shareModalOpen}
      onClose={() => {
        if (!selectContactsModalOpen) {
          setShareModalState(false);
        }
      }}
    >
      <PopoverTrigger>
        <button
          data-testid="share-button"
          className="text-white bg-primary py-2.5 px-5 rounded-md flex items-center"
          onClick={() => {
            setShareModalState(!shareModalOpen);
          }}
        >
          <span>Share</span>
          <img
            src={"/assets/share.svg"}
            className="object-contain w-4 h-4 ml-2"
          ></img>
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="w-full lg:w-[35vw] border border-gray-200 rounded-lg shadow-lg outline-none">
          <div data-testid="share-screen">
            <Header />
            <div className="border-y border-gray-200" id="share-screen">
              <InviteButton
                setSelectContactsModalState={setSelectContactsModalState}
              />
              {invitedContacts?.contacts.map(
                (
                  contact: {
                    name: string;
                    image?: string;
                    id: string;
                    access: string;
                    members?: number;
                    email?: string;
                  },
                  index: number
                ) => {
                  return (
                    <div
                      className="flex items-center my-2 mx-2"
                      key={contact.id}
                      data-testid={contact.name + " Invited"}
                    >
                      {contact.image && (
                        <img
                          src={contact.image}
                          className="w-10 h-10 object-contain rounded-full"
                        ></img>
                      )}
                      {!contact.image && (
                        <span className="flex items-center justify-center w-10 h-10 rounded-md text-white bg-light">
                          {contact.name.substring(0, 1)}
                        </span>
                      )}
                      <div className="flex flex-col ml-2">
                        <span className="text-base text-primary">
                          {contact.name}
                        </span>
                        <span className="text-sm text-light">
                          {contact.email
                            ? contact.email
                            : contact.members + " workspace members"}
                        </span>
                      </div>
                      <div className="ml-auto">
                        <Menu placement="bottom">
                          <MenuButton>
                            <div className="flex items-center text-light cursor-pointer">
                              <span
                                className={`text-xs ${
                                  contact.access === "No access"
                                    ? "text-red-600"
                                    : "text-light"
                                }`}
                              >
                                {contact.access}
                              </span>
                              <img
                                className="object-contain mx-2 w-2 h-2"
                                src={"/assets/caret-down.svg"}
                              ></img>
                            </div>
                          </MenuButton>
                          <MenuList className="text-sm">
                            {accessLevels.map((accessLevel) => (
                              <MenuItem
                                minH="30px"
                                onClick={() => setAccess(accessLevel, index)}
                                key={accessLevel}
                              >
                                {accessLevel}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </Menu>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
            <Footer />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default memo(Share);
