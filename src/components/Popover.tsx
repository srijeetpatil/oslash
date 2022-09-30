import { memo, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";
import Share from "./PopoverScreens/Share";
import SelectPersonOrGroup from "./PopoverScreens/SelectPersonOrGroup";

const Popup = () => {
  const [popupScreen, setPopupScreen] = useState<number>(1);
  const [invitedContacts, setInvitedContacts] = useState<
    Array<{ name: string; image?: string; access: string }>
  >([]);

  return (
    <Popover
      styleConfig={{
        maxWidth: "unset",
        width: "unset",
      }}
      onClose={() => setPopupScreen(1)}
    >
      <PopoverTrigger>
        <button className="text-white bg-primary py-2.5 px-5 rounded-md flex items-center">
          <span>Share</span>
          <img
            src={"/assets/share.svg"}
            className="object-contain w-4 h-4 ml-2"
          ></img>
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="w-[35vw] border border-gray-200 rounded-lg shadow-lg outline-none">
          {popupScreen === 1 && (
            <Share
              setPopupScreen={setPopupScreen}
              invitedContacts={invitedContacts}
              setInvitedContacts={setInvitedContacts}
            />
          )}
          {popupScreen === 2 && (
            <SelectPersonOrGroup
              invitedContacts={invitedContacts}
              setInvitedContacts={setInvitedContacts}
              setPopupScreen={setPopupScreen}
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default memo(Popup);
