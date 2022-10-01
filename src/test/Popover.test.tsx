import { fireEvent, render, screen } from "@testing-library/react";
import Popover from "../components/Popover";

// I am very new to React testing.
// So to first myself learn, I have written this small test.
test("Renders OSlash popover", () => {
  render(<Popover />);

  const shareButton = screen.getByTestId("share-button");

  fireEvent.click(shareButton);

  const ShareScreen = screen.getByTestId("share-screen");

  expect(ShareScreen).toBeInTheDocument();
});
