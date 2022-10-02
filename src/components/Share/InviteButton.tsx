const InviteButton = ({
  setSelectContactsModalState,
}: {
  setSelectContactsModalState: Function;
}) => {
  return (
    <div
      className="grid grid-cols-12 items-center rounded-md my-4 mx-2 hover:border-indigo-500 border border-gray-200"
      onClick={() => setSelectContactsModalState(true)}
      data-testid="invite-input"
    >
      <input
        type="text"
        placeholder="People, emails, groups"
        className="col-span-10 px-2 py-2 rounded-tl-md rounded-bl-md outline-none cursor-pointer"
      ></input>
      <button className="col-span-2 px-2 py-2 border-l border-gray-200 rounded-tr-md rounded-br-md bg-secondary">
        Invite
      </button>
    </div>
  );
};

export default InviteButton;
