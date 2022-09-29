import "./App.css";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react";

function App() {
  return (
    <div className="App container mx-auto my-6">
      <div className="flex justify-center mt-16">
        <Popover
          styleConfig={{
            maxWidth: "unset",
            width: "unset",
          }}
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
            <div className="w-[35vw] border border-gray-200 rounded-lg shadow-lg">
              <div className="flex items-center px-4 py-4">
                <img
                  src={"/assets/web.svg"}
                  className="w-10 h-10 object-contain"
                ></img>
                <div className="flex flex-col ml-4">
                  <span className="text-lg text-primary">Share to web</span>
                  <span className="text-sm text-light">
                    Publish and share link with anyone
                  </span>
                </div>
                <div className="ml-auto">
                  <Switch size="md" />
                </div>
              </div>
              <div className="border-y border-gray-200">
                <div className="grid grid-cols-12 items-center rounded-md my-4 mx-2 hover:border-indigo-500 border border-gray-200">
                  <input
                    type="text"
                    placeholder="People, emails, groups"
                    className="col-span-10 px-2 py-2 rounded-tl-md rounded-bl-md outline-none"
                  ></input>
                  <button className="col-span-2 px-2 py-2 border-l border-gray-200 rounded-tr-md rounded-br-md bg-secondary">
                    Invite
                  </button>
                </div>
                <div className="flex items-center my-2 mx-2">
                  <img
                    src={"/assets/oslash-logo.png"}
                    className="w-11 h-11 object-contain rounded-full"
                  ></img>
                  <div className="flex flex-col ml-2">
                    <span className="text-lg text-primary">
                      Everyone at OSlash
                    </span>
                    <span className="text-sm text-light">
                      25 workspace members
                    </span>
                  </div>
                  <div className="flex items-center ml-auto cursor-pointer">
                    <span className="text-sm">No access</span>
                    <img
                      src={"/assets/caret-down.svg"}
                      className="object-contain mx-2"
                    ></img>
                  </div>
                </div>
              </div>
              <div className="flex items-center bg-secondary px-4 py-4">
                <img
                  src={"/assets/help.svg"}
                  className="w-4 h-4 object-contain rounded-full"
                ></img>
                <div className="flex flex-col ml-2">
                  <span className="text-light">
                    learn about sharing
                  </span>
                </div>
                <div className="flex items-center ml-auto cursor-pointer">
                  <img
                    src={"/assets/link.svg"}
                    className="object-contain mx-2"
                  ></img>
                  <span className="text-primary">Copy link</span>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default App;
