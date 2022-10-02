import { Switch } from "@chakra-ui/react";
import { memo } from "react";

const Header = () => {
  return (
    <div className="flex items-center px-4 py-4">
      <img src={"/assets/web.svg"} className="w-10 h-10 object-contain"></img>
      <div className="flex flex-col ml-2">
        <span className="text-base text-primary">Share to web</span>
        <span className="text-sm text-light">
          Publish and share link with anyone
        </span>
      </div>
      <div className="ml-auto">
        <Switch size="md" colorScheme={"gray"} />
      </div>
    </div>
  );
};

export default memo(Header);
