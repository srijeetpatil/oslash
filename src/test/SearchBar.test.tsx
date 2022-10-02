import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SelectContacts from "../components/SelectContacts";
import { AppState } from "../context/AppState";

// Checks if after typing 'Wade' in the search bar,
// does Wade Cooper appear in the suggestions
test("After typing in the search bar results should appear", () => {
  render(
    <AppState>
      <SelectContacts />
    </AppState>
  );

  const searchBar = screen.getByPlaceholderText(
    /Search emails, names or groups/i
  );

  // Type inside the search bar
  userEvent.type(searchBar, "Wade");

  // Click on the user listed in suggestions
  const user = screen.getByText(/Wade Cooper/i);
  fireEvent.click(user);

  // After clicking, the user's name is shown in a pill component
  const pill = screen.getByTestId("wade-cooper-pill");

  expect(pill).toBeInTheDocument();
});
