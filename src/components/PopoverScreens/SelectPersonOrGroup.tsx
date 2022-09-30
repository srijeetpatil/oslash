import { group } from "console";
import { memo, useState } from "react";

const users = [
  { name: "Wade Cooper", image: "/assets/Wade.png" },
  { name: "Arlene Mccoy", image: "/assets/Arlene.png" },
];

const groups = [{ name: "Product" }, { name: "Engineering" }];

const SelectPersonOrGroup = () => {
  const [selectedContacts, setSelectedContacts] = useState<Array<string>>([]);

  return (
    <>
      <div className="flex items-center px-4 py-2.5 justify-between bg-dark">
        <div className="flex flex-wrap grow w-[60%]">
          {selectedContacts.map((contact, index) => {
            return (
              <div
                className="flex items-center text-xs px-2 py-1 bg-pill rounded mr-1 mt-1"
                key={contact}
              >
                {contact}
                <img
                  className="w-2 h-2 object-contain ml-2 cursor-pointer"
                  src={"/assets/cross.svg"}
                  onClick={() => {                    
                    setSelectedContacts([...selectedContacts.splice(index, 1)]);
                  }}
                ></img>
              </div>
            );
          })}
          <input
            type="text"
            className="text-light bg-transparent outline-none text-sm w-max"
            placeholder={
              selectedContacts.length === 0
                ? "Search emails, names or groups"
                : ""
            }
          ></input>
        </div>
        <div className="flex items-center text-light cursor-pointer">
          <span className="text-xs">Full access</span>
          <img
            className="object-contain mx-2 w-2 h-2"
            src={"/assets/caret-down.svg"}
          ></img>
        </div>
        <button className="bg-white px-3 py-1.5 rounded-md border border-gray-300 text-sm">
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
                if (!selectedContacts.includes(user.name)) {
                  let updatedArray = [...selectedContacts, user.name];
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
                if (!selectedContacts.includes(group.name)) {
                  let newArray = [...selectedContacts, group.name];
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
        <span className="ml-2 text-sm">learn about sharing</span>
      </div>
    </>
  );
};

export default memo(SelectPersonOrGroup);
