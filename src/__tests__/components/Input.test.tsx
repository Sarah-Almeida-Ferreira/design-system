import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, assert, beforeAll, afterEach } from "vitest";
import { Input } from "@lib/components/Input";
import { useState } from "react";

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

        expect(input.getAttribute("type")).toBe("password");

        fireEvent.click(toggleButton);
        expect(input.getAttribute("type")).toBe("text");

        fireEvent.click(toggleButton);
        expect(input.getAttribute("type")).toBe("password");
    });

    it("calls onChange when input changes", () => {
        const handleChange = vi.fn();
        render(
            <Input label="Name" name="name" id="name" onChange={handleChange} placeholder="Type your name" />
        );

        const input = screen.getByTestId("input");
        fireEvent.input(input, { target: { value: "John" } });

        expect(handleChange).toHaveBeenCalledTimes(1);
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
        assert.exists(input);
    });

    it("changes label's className when input value is blank", async () => {
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

        expect(label.classList.contains("focused")).toBeTruthy();

        fireEvent.input(input, { target: { value: "" } });

        await waitFor(() => {
            vi.runOnlyPendingTimersAsync();
            expect(label.classList.contains("focused")).toBeFalsy();
        });
    });

    it("changes label's className when input value is not blank", async () => {
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

        fireEvent.input(input, { target: { value: "myusername" } });

        await waitFor(() => {
            vi.runOnlyPendingTimersAsync();
            expect(label.classList.contains("focused")).toBeTruthy();
        });
    });

    it("changes label's className when input is focused", async () => {
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

        fireEvent.focus(input);

        await waitFor(() => {
            vi.runOnlyPendingTimersAsync();
            expect(label.classList.contains("focused")).toBeTruthy();
        });
    });

    it("changes label's className when input is blurred", async () => {
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

        fireEvent.focus(input);

        await waitFor(() => {
            vi.runOnlyPendingTimersAsync();
            expect(label.classList.contains("focused")).toBeTruthy();
        });

        fireEvent.blur(input);

        await waitFor(() => {
            vi.runOnlyPendingTimersAsync();
            expect(label.classList.contains("focused")).toBeFalsy();
        });
    });

    it("shows error when error prop is defined", async () => {
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

        screen.getByText("Show Error").click();

        await waitFor(() => {
            vi.runOnlyPendingTimersAsync();
            expect(inputField.classList.contains("has-error")).toBeTruthy();
            assert.exists(screen.getByTestId("input-error"));
        });
    });
});
