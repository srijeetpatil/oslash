import { memo, useEffect, useState } from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

const users = [
  { name: "Wade Cooper", image: "/assets/Wade.png" },
  { name: "Arlene Mccoy", image: "/assets/Arlene.png" },
];

const groups = [{ name: "Product" }, { name: "Engineering" }];

const accessLevels = ["Full access", "Can edit", "Can view", "No access"];

const SelectContacts = ({
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
  const [activeContact, setActiveContact] = useState<number>(-1);
  const [searchText, setSearchText] = useState<string>("");
  const [searchSuggestions, setSearchSuggestions] = useState<
    Array<{ name: string; image?: string }>
  >([...users, ...groups]);

  const [groupsStartIndex, setGroupsStartIndex] = useState<number>(
    users.length
  );

  useEffect(() => {
    let searchBar: HTMLInputElement | null = document.getElementById(
      "SearchContacts"
    ) as HTMLInputElement;
    if (searchBar) searchBar.focus();
  }, []);

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

  const keyboardActions = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let key = e.key;

    if (key === "Enter") {
      if (activeContact !== -1) {
        if (!selectedContacts.includes(users[activeContact])) {
          let updatedArray = [
            ...selectedContacts,
            searchSuggestions[activeContact],
          ];
          setSelectedContacts(updatedArray);
        }
      }
    } else if (key === "ArrowUp") {
      if (activeContact === -1) {
        setActiveContact(0);
      } else if (activeContact !== 0) {
        setActiveContact(activeContact - 1);
      }
    } else if (key === "ArrowDown") {
      if (activeContact === -1) {
        setActiveContact(0);
      } else if (activeContact !== searchSuggestions.length - 1) {
        setActiveContact(activeContact + 1);
      }
    }
  };

  return (
    <div
      onKeyDown={keyboardActions}
      className="outline-none"
      data-testid="select-contacts"
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
            {accessLevels.map((accessLevel) => (
              <MenuItem
                minH="30px"
                onClick={() => setAccess(accessLevel)}
                key={accessLevel}
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
            }
          }}
        >
          Invite
        </button>
      </div>
      <div
        className="border-y border-gray-200 px-4 py-2.5"
        onMouseLeave={() => setActiveContact(-1)}
      >
        {searchSuggestions.map((suggestion, index) => {
          return (
            <div key={suggestion.name}>
              {index === groupsStartIndex ? (
                <div className="my-2">
                  <span className="text-label font-semibold">
                    Select a group
                  </span>
                </div>
              ) : index === 0 ? (
                <div className="my-2">
                  <span className="text-label font-semibold">
                    Select a person
                  </span>
                </div>
              ) : (
                <></>
              )}
              <div
                className={`flex items-center px-2 py-2 ${
                  activeContact === index ? "bg-dark" : "bg-white"
                } rounded-md cursor-pointer`}
                onClick={() => {
                  if (!selectedContacts.includes(suggestion)) {
                    let updatedArray = [...selectedContacts, suggestion];
                    setSelectedContacts(updatedArray);
                  }
                }}
                onMouseEnter={() => setActiveContact(index)}
                key={suggestion.name}
              >
                {suggestion.image ? (
                  <img
                    src={suggestion.image}
                    className="object-contain w-5 h-5"
                  ></img>
                ) : (
                  <span className="flex items-center justify-center w-5 h-5 text-xs text-white rounded-md bg-light">
                    {suggestion.name.substring(0, 1)}
                  </span>
                )}
                <span className="ml-3 text-primary text-sm">
                  {suggestion.name}
                </span>
              </div>
            </div>
          );
        })}
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

export default memo(SelectContacts);
