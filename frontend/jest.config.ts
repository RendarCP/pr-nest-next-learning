import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testMatch: ["**/*.test.[jt]s?(x)", "**/*.spec.[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/e2e/"],
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "components/**/*.{js,jsx,ts,tsx}",
    "!components/**/index.ts",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/*.test.{js,jsx,ts,tsx}",
    "!**/*.spec.{js,jsx,ts,tsx}",
  ],
};

export default createJestConfig(config);
