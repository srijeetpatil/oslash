import { fireEvent, render, screen } from "@testing-library/react";
import Popover from "../components/Popover";

// Checks if the select contacts screen is opened if
// the user clicks on invite input field
test("Opens new window to search people or groups", () => {
  render(<Popover />);

  // Click on share
  const shareButton = screen.getByTestId("share-button");
  fireEvent.click(shareButton);

  // Click on invite
  const InviteInput = screen.getByTestId("invite-input");
  fireEvent.click(InviteInput);

  const SelectContacts = screen.getByTestId("select-contacts");
 
  // See if the select contacts screen shows up.
  expect(SelectContacts).toBeInTheDocument();
});
