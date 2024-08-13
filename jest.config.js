module.exports = {
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.js"],
  testTimeout: 30000,
  rootDir: "./src",
};
