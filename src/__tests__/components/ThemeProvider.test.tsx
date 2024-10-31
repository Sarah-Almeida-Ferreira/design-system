import { render, renderHook, screen } from "@testing-library/react";
import { ThemeProvider } from "@lib/components/ThemeProvider";
import { ThemeContext, lightTheme, darkTheme, useTheme } from "@lib/components/ThemeProvider/context";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ReactNode } from "react";

describe("ThemeProvider", () => {
    it("applies light theme styles by default", () => {
        render(
            <ThemeProvider>
                {<div>Content</div>}
            </ThemeProvider>
        );
        const root = document.documentElement;

        expect(root.style.getPropertyValue("--background")).toBe(lightTheme.background);
    });

    it("applies dark theme styles when isDarkMode is true", () => {
        render(
            <ThemeProvider isDarkMode useMatchMedia={false}>
                {<div>Content</div>}
            </ThemeProvider>
        );
        const root = document.documentElement;

        expect(root.style.getPropertyValue("--background")).toBe(darkTheme.background);
    });

    it("respects user's preference for dark mode if available", () => {
        vi.stubGlobal("matchMedia", () => ({
            matches: true,
            addListener: vi.fn(),
            removeListener: vi.fn(),
        }));

        render(
            <ThemeProvider>
                {<div>Content</div>}
            </ThemeProvider>
        );

        const root = document.documentElement;
        expect(root.style.getPropertyValue("--background")).toBe(darkTheme.background);

        vi.unstubAllGlobals();
    });

    it("provides theme context to children", () => {
        render(
            <ThemeProvider>
                <ThemeContext.Consumer>
                    {(value) => (
                        <div data-testid="theme-context">
                            {value?.light && "Light Theme Available"}
                        </div>
                    )}
                </ThemeContext.Consumer>
            </ThemeProvider>
        );

        expect(screen.getByTestId("theme-context").textContent).toBe("Light Theme Available");
    });
});

describe("useTheme", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
        <ThemeProvider light={lightTheme} dark={darkTheme}>
            {children}
        </ThemeProvider>
    );

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("returns light and dark theme values when used within ThemeProvider", () => {
        console.error = vi.fn();
        const { result } = renderHook(() => useTheme(), { wrapper });

        expect(result.current.light).toEqual(lightTheme);
        expect(result.current.dark).toEqual(darkTheme);
        expect(console.error).not.toHaveBeenCalledWith("useTheme must be used within a ThemeProvider");
    });

    it("throws an error when used outside of ThemeProvider", () => {
        const consoleError = console.error = vi.fn();
        expect(() => renderHook(() => useTheme())).toThrowError("useTheme must be used within a ThemeProvider");
        expect(consoleError.mock.calls[0][0]).includes("useTheme must be used within a ThemeProvider");
    });
});
