import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MethodologyStepper } from "@/components/home/Methodology";

describe("MethodologyStepper", () => {
  it("switches phases with keyboard-activatable buttons", async () => {
    const user = userEvent.setup();
    render(<MethodologyStepper />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      /Assess/,
    );
    await user.click(screen.getByRole("button", { name: /Pilot/i }));
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      /Pilot/,
    );
  });
});
