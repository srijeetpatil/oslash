import { fireEvent, render, screen } from "@testing-library/react";
import SelectContacts from "../components/SelectContacts";
import Share from "../components/Share";
import { AppState } from "../context/AppState";

// To test whether the select contacts modal opens upon clicking the invite input
test("Upon clicking the invite button the select contacts modal should open", () => {
  render(
    <AppState>
      <Share />
      <SelectContacts />
    </AppState>
  );

  const inviteInput = screen.getByTestId("invite-input");

  // Click on the invite input
  fireEvent.click(inviteInput);

  const searchBar = screen.getByPlaceholderText(
    /Search emails, names or groups/i
  );

  expect(searchBar).toBeInTheDocument();
});
