import { render, screen, act } from "@testing-library/react";
import { Toast, ToastProps } from "@lib/components/Toast";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("Toast Component", () => {
    vi.useFakeTimers();

    const defaultProps: ToastProps = {
        message: "Test message",
        duration: 3000,
        type: "info",
        onClose: vi.fn(),
    };

    afterEach(() => {
        vi.clearAllTimers();
        vi.clearAllMocks();
    });

    it("renders the toast message", () => {
        render(<Toast {...defaultProps} />);
        const messageElement = screen.getByText("Test message");
        expect(messageElement).toBeInTheDocument();
    });

    it("applies the correct class based on type", () => {
        const { rerender } = render(<Toast {...defaultProps} type="success" />);
        expect(screen.getByText("Test message").parentElement).toHaveClass("toast-success");

        rerender(<Toast {...defaultProps} type="danger" />);
        expect(screen.getByText("Test message").parentElement).toHaveClass("toast-danger");

        rerender(<Toast {...defaultProps} type="warning" />);
        expect(screen.getByText("Test message").parentElement).toHaveClass("toast-warning");
    });

    it("adds the 'active' class after 100ms", () => {
        render(<Toast {...defaultProps} />);
        const toastElement = screen.getByText("Test message").parentElement;

        expect(toastElement).not.toHaveClass("active");

        act(() => {
            vi.advanceTimersByTime(100);
        });

        expect(toastElement).toHaveClass("active");
    });

    it("applies the timer style with transition to 0% width", () => {
        render(<Toast {...defaultProps} />);
        const timerElement = screen.getByRole("timer");

        act(() => {
            vi.advanceTimersByTime(100);
        });

        expect(timerElement).toHaveStyle({
            width: "0%",
            transition: "width 3000ms linear",
        });
    });

    it("calls onClose after duration + 300ms", () => {
        render(<Toast {...defaultProps} />);

        act(() => {
            vi.advanceTimersByTime(3300);
        });

        expect(defaultProps.onClose).toHaveBeenCalled();
    });

    it("removes the 'active' class after duration", () => {
        render(<Toast {...defaultProps} />);
        const toastElement = screen.getByText("Test message").parentElement;

        act(() => {
            vi.advanceTimersByTime(100);
        });
        expect(toastElement).toHaveClass("active");

        act(() => {
            vi.advanceTimersByTime(3000);
        });
        expect(toastElement).not.toHaveClass("active");
    });
});
