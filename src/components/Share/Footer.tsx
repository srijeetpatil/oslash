import { memo, useState } from "react";

const Footer = () => {
  const [copyActive, setCopyActive] = useState<boolean>(false);

  return (
    <div className="flex items-center bg-secondary px-4 py-4">
      <img
        src={"/assets/help.svg"}
        className="w-4 h-4 object-contain rounded-full cursor-pointer"
      ></img>
      <div className="flex flex-col ml-2">
        <span className="text-sm text-light cursor-pointer">
          learn about sharing
        </span>
      </div>
      <div className="flex items-center ml-auto cursor-pointer">
        <img
          src={"/assets/link.svg"}
          className={`object-contain mx-2 ${
            copyActive ? "text-green-500" : "text-primary"
          }`}
        ></img>
        <span
          className={`text-sm ${
            copyActive ? "text-green-500 font-semibold" : "text-primary"
          }`}
          onClick={() => {
            navigator.clipboard.writeText("https://www.oslash.com/");
            setCopyActive(true);
          }}
        >
          {copyActive ? "Copied!" : "Copy link"}
        </span>
      </div>
    </div>
  );
};

export default memo(Footer);
