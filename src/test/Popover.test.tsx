import { fireEvent, render, screen } from "@testing-library/react";
import Share from "../components/Share";

// I am very new to React testing.
// So to first myself learn, I have written this small test.
test("Renders OSlash popover", () => {
  render(<Share />);

  const shareButton = screen.getByTestId("share-button");

  fireEvent.click(shareButton);

  const ShareScreen = screen.getByTestId("share-screen");

  expect(ShareScreen).toBeInTheDocument();
});
