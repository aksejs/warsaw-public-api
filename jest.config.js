module.exports = {
  roots: ["<rootDir>/src/"],
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "node",
  transformIgnorePatterns: [
    "/node_modules/(?!(axios|retry-axios|query-string|decode-uri-component|split-on-first|filter-obj)/)",
  ],
  collectCoverageFrom: ["src/**/([a-zA-Z_]*).{js,ts}", "!**/*.test.{js,ts}"],
};
