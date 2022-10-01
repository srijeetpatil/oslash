const Share = () => {
  return (
    <button
      data-testid="share-button"
      className="text-white bg-primary py-2.5 px-5 rounded-md flex items-center"
    >
      <span>Share</span>
      <img
        src={"/assets/share.svg"}
        className="object-contain w-4 h-4 ml-2"
      ></img>
    </button>
  );
};
