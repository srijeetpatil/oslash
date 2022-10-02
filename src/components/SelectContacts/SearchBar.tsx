import { memo, useState } from "react";
import { users, groups, accessLevels } from "../../utilities/Defaults";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useAppContext } from "../../context/AppState";

const Search = ({
  selectedContacts,
  setSelectedContacts,
  setGroupsStartIndex,
  setSearchSuggestions,
}: {
  selectedContacts: Array<{
    name: string;
    image?: string;
    id: string;
    email?: string;
    members?: number;
  }>;
  setSelectedContacts: Function;
  setGroupsStartIndex: Function;
  setSearchSuggestions: Function;
}) => {
  const [access, setAccess] = useState<string>("Full access");
  const [searchText, setSearchText] = useState<string>("");

  const { setInvitedContacts, setSelectContactsModalState }: any =
    useAppContext();

  // Does a full linear search with regex filtering
  // and matches only those names with matching searchText
  const fetchSearchSuggestions = (searchText: string) => {
    let regex = new RegExp(searchText, "i");
    let arrayOfSuggestions: Array<{ name: string; image?: string }> = [];

    users.forEach((user) => {
      if (regex.test(user.name)) {
        arrayOfSuggestions.push(user);
      }
    });

    setGroupsStartIndex(arrayOfSuggestions.length);

    groups.forEach((group) => {
      if (regex.test(group.name)) {
        arrayOfSuggestions.push(group);
      }
    });

    setSearchSuggestions(arrayOfSuggestions);
  };

  return (
    <div className="flex items-center px-4 py-2.5 justify-between bg-dark">
      <div className="flex flex-wrap grow w-[60%]">
        {selectedContacts.map((contact, index) => {
          const { name, id } = contact;
          return (
            <div
              className="flex items-center text-xs px-2 py-1 bg-pill rounded mr-1 my-1"
              key={id}
              data-testid={name.toLowerCase().split(" ").join("-") + "-pill"}
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
          data-testid="search-contacts"
          id="SearchContacts"
          type="text"
          className="text-light bg-transparent outline-none text-sm w-full"
          placeholder={
            selectedContacts.length === 0
              ? "Search emails, names or groups"
              : ""
          }
          onChange={(e) => {
            fetchSearchSuggestions(e.target.value);
            setSearchText(e.target.value);
          }}
        ></input>
      </div>
      <Menu placement="bottom">
        <MenuButton>
          <div
            className="flex items-center text-light cursor-pointer"
            data-testid="select-multiple-access"
          >
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
          {accessLevels.map((accessLevel) => (
            <MenuItem
              minH="30px"
              onClick={() => setAccess(accessLevel)}
              key={accessLevel}
              data-testid={accessLevel}
            >
              {accessLevel}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <button
        className="bg-white px-3 py-1.5 rounded-md border border-gray-300 text-sm"
        onClick={() => {
          if (selectedContacts.length > 0) {
            setInvitedContacts(selectedContacts, access);

            setSelectContactsModalState(false);

            let shareScreen: HTMLElement | null =
              document.getElementById("share-screen");
            if (shareScreen) shareScreen.focus();
          }
        }}
        data-testid={"invite-button"}
      >
        Invite
      </button>
    </div>
  );
};

export default memo(Search);
