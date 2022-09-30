import { memo, useState } from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

const users = [
  { name: "Wade Cooper", image: "/assets/Wade.png" },
  { name: "Arlene Mccoy", image: "/assets/Arlene.png" },
];

const groups = [{ name: "Product" }, { name: "Engineering" }];

const SelectPersonOrGroup = ({
  setInvitedContacts,
  invitedContacts,
  setPopupScreen,
}: {
  setInvitedContacts: Function;
  invitedContacts: Array<{ name: string; image?: string; access: string }>;
  setPopupScreen: Function;
}) => {
  const [selectedContacts, setSelectedContacts] = useState<
    Array<{ name: string; image?: string }>
  >([]);
  const [access, setAccess] = useState<string>("Full access");

  return (
    <div
      onKeyDown={(e) => {
        let key = e.key;

        if (key === "Enter") {
        } else if (key === "ArrowUp") {
        } else if (key === "ArrowDown") {
        }
      }}
    >
      <div className="flex items-center px-4 py-2.5 justify-between bg-dark">
        <div className="flex flex-wrap grow w-[60%]">
          {selectedContacts.map((contact, index) => {
            const { name } = contact;
            return (
              <div
                className="flex items-center text-xs px-2 py-1 bg-pill rounded mr-1 my-1"
                key={name}
              >
                {name}
                <img
                  className="w-2 h-2 object-contain ml-2 cursor-pointer"
                  src={"/assets/cross.svg"}
                  onClick={() => {
                    selectedContacts.splice(index, 1);

                    setSelectedContacts([...selectedContacts]);
                  }}
                ></img>
              </div>
            );
          })}
          <input
            type="text"
            className="text-light bg-transparent outline-none text-sm w-full"
            placeholder={
              selectedContacts.length === 0
                ? "Search emails, names or groups"
                : ""
            }
          ></input>
        </div>
        <Menu placement="bottom">
          <MenuButton>
            <div className="flex items-center text-light cursor-pointer">
              <span
                className={`text-xs ${
                  access === "No access" ? "text-red-600" : "text-light"
                }`}
              >
                {access}
              </span>
              <img
                className="object-contain mx-2 w-2 h-2"
                src={"/assets/caret-down.svg"}
              ></img>
            </div>
          </MenuButton>
          <MenuList className="text-sm">
            <MenuItem minH="30px" onClick={() => setAccess("Full access")}>
              Full access
            </MenuItem>
            <MenuItem minH="30px" onClick={() => setAccess("Can edit")}>
              Can edit
            </MenuItem>
            <MenuItem minH="30px" onClick={() => setAccess("Can view")}>
              Can view
            </MenuItem>
            <MenuItem minH="30px" onClick={() => setAccess("No access")}>
              <span className="text-red-600">No access</span>
            </MenuItem>
          </MenuList>
        </Menu>
        <button
          className="bg-white px-3 py-1.5 rounded-md border border-gray-300 text-sm"
          onClick={() => {
            let newArray: Array<{
              name: string;
              image?: string;
              access: string;
            }> = [];
            selectedContacts.forEach((contact, index) => {
              newArray.push({
                name: contact.name,
                image: contact.image,
                access: access,
              });
            });

            setInvitedContacts([...invitedContacts, ...newArray]);

            setPopupScreen(1);
          }}
        >
          Invite
        </button>
      </div>
      <div className="border-y border-gray-200 px-4 py-2.5">
        <span className="text-label font-semibold">Select a person</span>
        <div className="my-2">
          {users.map((user, index) => (
            <div
              className="flex items-center px-2 py-2 hover:bg-dark rounded-md cursor-pointer"
              onClick={() => {
                if (!selectedContacts.includes(user)) {
                  let updatedArray = [...selectedContacts, user];
                  setSelectedContacts(updatedArray);
                }
              }}
              key={user.name}
            >
              <img src={user.image} className="object-contain w-5 h-5"></img>
              <span className="ml-3 text-primary text-sm">{user.name}</span>
            </div>
          ))}
        </div>
        <span className="text-label font-semibold">Select a group</span>
        <div className="my-2">
          {groups.map((group) => (
            <div
              className="flex items-center px-2 py-2 hover:bg-dark rounded-md cursor-pointer"
              onClick={() => {
                if (!selectedContacts.includes(group)) {
                  let newArray = [...selectedContacts, group];
                  setSelectedContacts(newArray);
                }
              }}
              key={group.name}
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-md text-white bg-light">
                {group.name.substring(0, 1)}
              </span>
              <span className="ml-3 text-primary text-sm">{group.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center bg-dark px-4 py-2.5">
        <img
          src={"/assets/help.svg"}
          className="w-4 h-4 object-contain rounded-full"
        ></img>
        <span className="ml-2 text-light text-sm">learn about sharing</span>
      </div>
    </div>
  );
};

export default memo(SelectPersonOrGroup);
