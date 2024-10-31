import type { Preview, StoryContext, StoryFn } from "@storybook/react";
import { useTheme } from "../lib/components/ThemeProvider/context";
import { ThemeProvider } from "../lib/components/ThemeProvider";
import React, { useEffect, useState } from "react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};


export const decorators = [
  (Story: StoryFn, context: StoryContext) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
      const isDark = context.globals.backgrounds?.value === "#333";
      return setIsDarkMode(isDark);
    }, [context.globals.backgrounds]);

    return (
    <ThemeProvider isDarkMode={isDarkMode} useMatchMedia={false}>
      <Story />
    </ThemeProvider>
  );
  },
];

export default preview;
