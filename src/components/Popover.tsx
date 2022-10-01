import { memo, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";
import Share from "./PopoverScreens/Share";
import SelectContacts from "./PopoverScreens/SelectContacts";

const Popup = () => {
  const [popupScreen, setPopupScreen] = useState<number>(0);
  const [invitedContacts, setInvitedContacts] = useState<
    Array<{ name: string; image?: string; access: string }>
  >([
    {
      name: "Everyone at OSlash",
      image: "/assets/oslash-logo.png",
      access: "No access",
    },
  ]);

  return (
    <Popover
      styleConfig={{
        maxWidth: "unset",
        width: "unset",
      }}
      isOpen={popupScreen === 1 || popupScreen === 2}
      onClose={() => setPopupScreen(0)}
    >
      <PopoverTrigger>
        <button
          data-testid="share-button"
          className="text-white bg-primary py-2.5 px-5 rounded-md flex items-center"
          onClick={() => {
            if (popupScreen === 0) setPopupScreen(1);
            else setPopupScreen(0);
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
        <div className="w-[35vw] border border-gray-200 rounded-lg shadow-lg outline-none">
          {popupScreen === 1 && (
            <Share
              setPopupScreen={setPopupScreen}
              invitedContacts={invitedContacts}
              setInvitedContacts={setInvitedContacts}
            />
          )}
          {popupScreen === 2 && (
            <SelectContacts
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
