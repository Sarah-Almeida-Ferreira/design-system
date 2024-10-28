import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.ts",
    coverage: {
      include: ["lib"],
      exclude: ["lib/main.ts"],
    },
  },
  resolve: {
    alias: {
      "@": "/src",
      "@lib": "/lib",
    },
  },
});
