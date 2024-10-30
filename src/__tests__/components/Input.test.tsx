import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, assert, beforeAll, afterEach } from "vitest";
import { Input } from "@lib/components/Input";
import { act, useState } from "react";

describe("Input Component", () => {
    beforeAll(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        cleanup();
    });

    it("renders the input field with label", () => {
        render(<Input label="Password" name="password" id="password" />);
        assert.exists(screen.getByLabelText("Password"));
    });

    it("toggles password visibility", () => {
        render(<Input label="Password" type="password" name="password" id="password" />);
        const toggleButton = screen.getByTestId("toggle-password-button");
        const input = screen.getByLabelText("Password");

        expect(input).toHaveAttribute("type", "password");

        fireEvent.click(toggleButton);
        expect(input).toHaveAttribute("type", "text");

        fireEvent.click(toggleButton);
        expect(input).toHaveAttribute("type", "password");
    });

    it("calls onChange when input changes", () => {
        const handleChange = vi.fn();

        const TestComponent = () => {
            const [value, setValue] = useState("");
            handleChange.mockImplementation((e) => setValue(e.target.value));

            return (
                <Input
                    label="Username"
                    name="username"
                    id="username"
                    value={value}
                    placeholder="Enter your username"
                    onChange={handleChange}
                />
            );
        };

        render(<TestComponent />);

        const input = screen.getByTestId("input");

        act(() => {
            fireEvent.input(input, { target: { value: "John" } });
        });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(input).toHaveAttribute("value", "John");
    });

    it("displays placeholder text correctly", () => {
        render(
            <Input
                label="Username"
                name="username"
                placeholder="Enter your username"
                value="test"
            />
        );

        const input = screen.getByPlaceholderText("Enter your username");
        expect(input).toBeInTheDocument();
    });

    it("changes label's className when input value is blank", () => {
        const handleChange = vi.fn();

        render(
            <Input
                label="Username"
                name="username"
                id="username"
                value="myusername"
                placeholder="Enter your username"
                onChange={handleChange}
            />
        );

        const label = screen.getByText("Username");
        const input = screen.getByTestId("input");

        expect(label).toHaveClass("focused");

        act(() => fireEvent.input(input, { target: { value: "" } }));

        expect(label).not.toHaveClass("focused");
    });

    it("changes label's className when input value is not blank", () => {
        const handleChange = vi.fn();

        render(
            <Input
                label="Username"
                name="username"
                id="username"
                value=""
                placeholder="Enter your username"
                onChange={handleChange}
            />
        );

        const label = screen.getByText("Username");
        const input = screen.getByTestId("input");

        expect(label.classList.contains("focused")).toBeFalsy();

        act(() => fireEvent.input(input, { target: { value: "myusername" } }));

        expect(label).toHaveClass("focused");
    });

    it("changes label's className when input is focused", () => {
        const handleChange = vi.fn();

        render(
            <Input
                label="Username"
                name="username"
                id="username"
                value=""
                placeholder="Enter your username"
                onChange={handleChange}
            />
        );

        const label = screen.getByText("Username");
        const input = screen.getByTestId("input");

        expect(label.classList.contains("focused")).toBeFalsy();

        act(() => fireEvent.focus(input));

        expect(label).toHaveClass("focused");
    });

    it("changes label's className when input is blurred", () => {
        const handleChange = vi.fn();

        render(
            <Input
                label="Username"
                name="username"
                id="username"
                value=""
                placeholder="Enter your username"
                onChange={handleChange}
            />
        );

        const label = screen.getByText("Username");
        const input = screen.getByTestId("input");

        act(() => fireEvent.focus(input));

        expect(label).toHaveClass("focused");

        act(() => fireEvent.blur(input));

        expect(label).not.toHaveClass("focused");
    });

    it("shows error when error prop is defined", () => {
        const handleChange = vi.fn();
        const TestComponent = () => {
            const [error, setError] = useState("");

            return (
                <div>
                    <Input
                        label="Username"
                        name="username"
                        id="username"
                        value=""
                        error={error}
                        placeholder="Enter your username"
                        onChange={handleChange}
                    />
                    <button onClick={() => setError("Input error")}>Show Error</button>
                </div>
            );
        };

        render(<TestComponent />);

        const inputField = screen.getByTestId("input-field");

        expect(inputField.classList.contains("has-error")).toBeFalsy();
        assert.notExists(screen.queryByTestId("input-error"));

        act(() => {
            screen.getByText("Show Error").click();
        });

        expect(inputField).toHaveClass("has-error");
        expect(screen.getByTestId("input-error")).toBeInTheDocument();
    });
});
