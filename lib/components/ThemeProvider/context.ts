import { createContext, useContext } from "react";

export type Theme = {
  background?: string;
  text?: string;
  primary?: string;
  primaryMute?: string;
  danger?: string;
};

interface ThemeContextType {
  light: Theme;
  dark: Theme;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const lightTheme = {
  background: "#FFFFFF",
  text: "#6A6A73",
  primary: "#25afa7",
  primaryMute: "#1e8d87",
  danger: "#F56565",
};

export const darkTheme = {
  background: "#333333",
  text: "#FFFFFF",
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
