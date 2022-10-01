import { memo } from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import Header from "./Share/Header";
import Footer from "./Share/Footer";

interface ShareProps {
  setPopupScreen: Function;
  invitedContacts: Array<{ name: string; image?: string; access: string }>;
  setInvitedContacts: Function;
}

const accessLevels = ["Full access", "Can edit", "Can view", "No access"];

const Share = ({
  setPopupScreen,
  invitedContacts,
  setInvitedContacts,
}: ShareProps) => {
  const setAccess = (access: string, index: number) => {
    let newArray = invitedContacts;
    newArray[index].access = access;
    setInvitedContacts([...newArray]);
  };

  return (
    <>
      <Header />
      <div className="border-y border-gray-200">
        <div className="grid grid-cols-12 items-center rounded-md my-4 mx-2 hover:border-indigo-500 border border-gray-200">
          <input
            type="text"
            placeholder="People, emails, groups"
            className="col-span-10 px-2 py-2 rounded-tl-md rounded-bl-md outline-none cursor-pointer"
            onClick={() => setPopupScreen(2)}
          ></input>
          <button className="col-span-2 px-2 py-2 border-l border-gray-200 rounded-tr-md rounded-br-md bg-secondary">
            Invite
          </button>
        </div>
        {invitedContacts.map((contact, index) => {
          return (
            <div className="flex items-center my-2 mx-2">
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
                <span className="text-base text-primary">{contact.name}</span>
                <span className="text-sm text-light">25 workspace members</span>
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
                      >
                        {accessLevel}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default memo(Share);
