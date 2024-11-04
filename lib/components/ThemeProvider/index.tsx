import { useState, useEffect, ReactNode } from "react";
import { ThemeContext, lightTheme, darkTheme, Theme } from "./context";

interface ThemeProviderProps {
    children: ReactNode;
    isDarkMode?: boolean;
    useMatchMedia?: boolean;
    light?: Theme;
    dark?: Theme;
}

export const ThemeProvider = ({
    children,
    light = lightTheme,
    dark = darkTheme,
    useMatchMedia = true,
    isDarkMode = false,
}: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(light);

    useEffect(() => {
        const root = document.documentElement;
        Object.entries(theme).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
    }, [theme]);

    useEffect(() => {
        const isDarkTheme = () => {
            return isDarkMode ||
                useMatchMedia &&
                window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches;
        };

        setTheme(isDarkTheme() ? dark : light);
    }, [isDarkMode, dark, light, useMatchMedia]);

    return (
        <ThemeContext.Provider value={{ light, dark }}>
            {children}
        </ThemeContext.Provider>
    );
};
