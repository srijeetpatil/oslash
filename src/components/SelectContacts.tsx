import { memo, useState } from "react";
import SearchBar from "./SelectContacts/SearchBar";
import { users, groups } from "../utilities/Defaults";

const SelectContacts = () => {
  const [selectedContacts, setSelectedContacts] = useState<
    Array<{
      name: string;
      image?: string;
      id: string;
      email?: string;
      members?: number;
    }>
  >([]);
  const [activeContact, setActiveContact] = useState<number>(-1);
  const [searchSuggestions, setSearchSuggestions] = useState<
    Array<{
      name: string;
      image?: string;
      id: string;
      email?: string;
      members?: number;
    }>
  >([...users, ...groups]);

  const [groupsStartIndex, setGroupsStartIndex] = useState<number>(
    users.length
  );

  // Assists the user with keyboard actions
  // Mainly Enter, ArrowUp and ArrowDown
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
      className="w-full lg:w-[35vw] border border-gray-200 rounded-lg shadow-lg outline-none"
      data-testid="select-contacts"
    >
      <SearchBar
        selectedContacts={selectedContacts}
        setSelectedContacts={setSelectedContacts}
        setGroupsStartIndex={setGroupsStartIndex}
        setSearchSuggestions={setSearchSuggestions}
      />
      <div
        className="border-y border-gray-200 px-4 py-2.5 bg-white"
        onMouseLeave={() => setActiveContact(-1)}
      >
        {searchSuggestions.map((suggestion, index) => {
          return (
            <div key={suggestion.id}>
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
                key={suggestion.id}
                data-testid={"search-suggestion"}
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
