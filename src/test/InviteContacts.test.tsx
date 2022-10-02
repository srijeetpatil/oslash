import { fireEvent, render, screen } from "@testing-library/react";
import SelectContacts from "../components/SelectContacts";
import Share from "../components/Share";
import { AppState } from "../context/AppState";

// Invite Wade Cooper contact and check if it exists in invited list
test("Invite contact after giving them access", () => {
  render(
    <AppState>
      <Share />
      <SelectContacts />
    </AppState>
  );

  // Search by text in all the suggestions
  // and click on the suggestion. By default all
  // the suggestions are present.
  const suggestion = screen.getByText(/Wade/i);
  fireEvent.click(suggestion);

  // Click on the access select dropdown
  const accessSelect = screen.getByTestId("select-multiple-access");
  fireEvent.click(accessSelect);

  // Give the user editing access
  const editAccess = screen.getByTestId("Can edit");
  fireEvent.click(editAccess);

  // Finally invite the user
  const inviteButton = screen.getByTestId("invite-button");
  fireEvent.click(inviteButton);

  // Check if the user exists in the invited users list
  const WadeCooper = screen.getByTestId("Wade Cooper Invited");

  expect(WadeCooper).toBeInTheDocument();
});
