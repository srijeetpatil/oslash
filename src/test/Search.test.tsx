import { render, screen, within } from "@testing-library/react";
import SelectContacts from "../components/PopoverScreens/SelectContacts";
import userEvent from "@testing-library/user-event";

test("Renders a list of users with matching text", () => {
  // Sending in dummy data/functions
  render(
    <SelectContacts
      invitedContacts={[]}
      setInvitedContacts={() => {}}
      setPopupScreen={() => {}}
    />
  );

  // Search input bar
  const SearchInput = screen.getByTestId("search-contacts");
  userEvent.type(SearchInput, "Wade");

  // Check if select a person text exists even after typing inside the search bar
  const { getByText } = within(screen.getByTestId("select-contacts"));

  expect(getByText("Select a person")).toBeInTheDocument();
});
