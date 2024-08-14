module.exports = {
  moduleDirectories: ["node_modules", "<rootDir>"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testTimeout: 30000,
  rootDir: "./src",
  setupFiles: ["dotenv/config"],
};

