import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    workspace: [
      {
        extends: true,
        test: {
          include: ["src/http/controllers/**/*.spec.ts"],
          name: "e2e",
          environment: "./vitest-environments/prisma.ts",
        },
      },
      {
        extends: true,
        test: {
          environment: "node",
          include: ["src/services/**/*.spec.ts"],
          name: "unit",
        },
      },
    ],
  },
});
