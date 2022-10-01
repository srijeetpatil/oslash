import { memo } from "react";

const Footer = () => {
  return (
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
  );
};

export default memo(Footer);
