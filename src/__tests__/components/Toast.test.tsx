import { render, screen } from "@testing-library/react";
import { Toast } from "@lib/components/Toast";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const onCloseMock = vi.fn();

describe("Toast Component", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        onCloseMock.mockClear();
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers();
    });

    test("renders with the correct message", () => {
        render(<Toast message="Test Message" onClose={onCloseMock} />);
        expect(screen.getByText("Test Message")).toBeInTheDocument();
    });

    test("applies the correct type class", () => {
        render(<Toast message="Test Message" onClose={onCloseMock} type="success" />);

        const toastElement = screen.getByText("Test Message").closest(".toast");
        expect(toastElement).toHaveClass("toast-success");
    });

    test("calls onClose after the specified duration", () => {
        const duration = 3000;
        render(<Toast message="Test Message" onClose={onCloseMock} duration={duration} />);

        vi.advanceTimersByTime(duration);
        expect(onCloseMock).toHaveBeenCalled();
    });

    test("does not call onClose before the duration ends", () => {
        const duration = 3000;
        render(<Toast message="Test Message" onClose={onCloseMock} duration={duration} />);

        vi.advanceTimersByTime(duration - 500);
        expect(onCloseMock).not.toHaveBeenCalled();
    });

    test("handles default duration correctly", () => {
        render(<Toast message="Test Message" onClose={onCloseMock} />);

        vi.advanceTimersByTime(30000);
        expect(onCloseMock).toHaveBeenCalled();
    });
});
