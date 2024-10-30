import { render, screen } from "@testing-library/react";
import { Logo } from "@lib/components/Logo";
import logo from "@lib/assets/logo.png";
import emblem from "@lib/assets/emblem.png";
import title from "@lib/assets/title.png";
import { describe, it, expect } from "vitest";

describe("Logo Component", () => {

    it("renders the logo by default", () => {
        render(<Logo data-testid="logo-image" />);
        const img: HTMLImageElement = screen.getByTestId("logo-image");
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", logo);
    });

    it("renders the logo when type is 'logo'", () => {
        render(<Logo type="logo" data-testid="logo-image" />);
        const img = screen.getByTestId("logo-image");
        expect(img).toHaveAttribute("src", logo);
    });

    it("renders the emblem when type is 'emblem'", () => {
        render(<Logo type="emblem" data-testid="logo-image" />);
        const img = screen.getByTestId("logo-image");
        expect(img).toHaveAttribute("src", emblem);
    });

    it("renders the title when type is 'title'", () => {
        render(<Logo type="title" data-testid="logo-image" />);
        const img = screen.getByTestId("logo-image");
        expect(img).toHaveAttribute("src", title);
    });

    it("passes additional props to the img element", () => {
        const altText = "Custom Alt Text";
        const className = "custom-class";
        render(<Logo type="logo" alt={altText} className={className} data-testid="logo-image" />);
        const img = screen.getByTestId("logo-image");
        expect(img).toHaveAttribute("alt", altText);
        expect(img).toHaveClass(className);
    });
});
