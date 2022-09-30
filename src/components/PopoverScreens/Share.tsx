import { memo } from "react";
import { Switch } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

interface ShareProps {
  setPopupScreen: Function;
  invitedContacts: Array<{ name: string; image?: string; access: string }>;
  setInvitedContacts: Function;
}

const Share = ({
  setPopupScreen,
  invitedContacts,
  setInvitedContacts,
}: ShareProps) => {
  return (
    <>
      <div className="flex items-center px-4 py-4">
        <img src={"/assets/web.svg"} className="w-10 h-10 object-contain"></img>
        <div className="flex flex-col ml-2">
          <span className="text-base text-primary">Share to web</span>
          <span className="text-sm text-light">
            Publish and share link with anyone
          </span>
        </div>
        <div className="ml-auto">
          <Switch size="md" />
        </div>
      </div>
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
        <div className="flex items-center my-2 mx-2">
          <img
            src={"/assets/oslash-logo.png"}
            className="w-10 h-10 object-contain rounded-full"
          ></img>
          <div className="flex flex-col ml-2">
            <span className="text-base text-primary">Everyone at OSlash</span>
            <span className="text-sm text-light">25 workspace members</span>
          </div>
          <div className="ml-auto">
            <Menu placement="bottom">
              <MenuButton>
                <div className="flex items-center text-light cursor-pointer">
                  <span className="text-xs text-red-600">No access</span>
                  <img
                    className="object-contain mx-2 w-2 h-2"
                    src={"/assets/caret-down.svg"}
                  ></img>
                </div>
              </MenuButton>
              <MenuList className="text-sm">
                <MenuItem minH="30px" onClick={() => {}}>
                  Full access
                </MenuItem>
                <MenuItem minH="30px" onClick={() => {}}>
                  Can edit
                </MenuItem>
                <MenuItem minH="30px" onClick={() => {}}>
                  Can view
                </MenuItem>
                <MenuItem minH="30px" onClick={() => {}}>
                  <span className="text-red-600">No access</span>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
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
                    <MenuItem
                      minH="30px"
                      onClick={() => {
                        let newArray = invitedContacts;
                        newArray[index].access = "Full access";
                        setInvitedContacts([...newArray]);
                      }}
                    >
                      Full access
                    </MenuItem>
                    <MenuItem
                      minH="30px"
                      onClick={() => {
                        let newArray = invitedContacts;
                        newArray[index].access = "Can edit";
                        setInvitedContacts([...newArray]);
                      }}
                    >
                      Can edit
                    </MenuItem>
                    <MenuItem
                      minH="30px"
                      onClick={() => {
                        let newArray = invitedContacts;
                        newArray[index].access = "Can view";
                        setInvitedContacts([...newArray]);
                      }}
                    >
                      Can view
                    </MenuItem>
                    <MenuItem
                      minH="30px"
                      onClick={() => {
                        let newArray = invitedContacts;
                        newArray[index].access = "No access";
                        setInvitedContacts([...newArray]);
                      }}
                    >
                      <span className="text-red-600">No access</span>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center bg-secondary px-4 py-4">
        <img
          src={"/assets/help.svg"}
          className="w-4 h-4 object-contain rounded-full"
        ></img>
        <div className="flex flex-col ml-2">
          <span className="text-sm text-light">learn about sharing</span>
        </div>
        <div className="flex items-center ml-auto cursor-pointer">
          <img src={"/assets/link.svg"} className="object-contain mx-2"></img>
          <span className="text-sm text-primary">Copy link</span>
        </div>
      </div>
    </>
  );
};

export default memo(Share);
