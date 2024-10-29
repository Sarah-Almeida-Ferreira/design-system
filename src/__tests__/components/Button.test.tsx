import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "@lib/components/Button";

const defaultLabel = "Click Me";

describe("Button Component", () => {

  it("renders with the correct label", () => {
    render(<Button label={defaultLabel} />);
    expect(screen.getByText(defaultLabel)).toBeInTheDocument();
  });

  it("applies primary class when primary prop is true", () => {
    render(<Button label={defaultLabel} primary />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("primary");
  });

  it("applies secondary class when primary prop is false", () => {
    render(<Button label={defaultLabel} primary={false} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("secondary");
  });

  it("applies text-only class when textOnly prop is true", () => {
    render(<Button label={defaultLabel} textOnly />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-only");
  });

  it("applies full-width class when fullWidth prop is true", () => {
    render(<Button label={defaultLabel} fullWidth />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("full-width");
  });

  it("applies the correct size class based on size prop", () => {
    render(<Button label={defaultLabel} size="large" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("large");
  });

  it("applies the correct text alignment class based on textAlign prop", () => {
    render(<Button label={defaultLabel} textAlign="left" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("align-text-left");
  });

  it("applies custom background color when backgroundColor prop is provided", () => {
    const backgroundColor = "red";
    render(<Button label={defaultLabel} style={{ backgroundColor }} />);
    const button = screen.getByRole("button");
    expect(button).toHaveStyle("background-color: rgb(255, 0, 0)");
  });

  it("calls onClick function when clicked", () => {
    const handleClick = vi.fn();
    render(<Button label={defaultLabel} onClick={handleClick} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders with the correct type attribute", () => {
    render(<Button label={defaultLabel} type="submit" />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });
});
