const esModules = ["ngx-socket-io"].join("|");

module.exports = {
  testMatch: ["**/+(*.)+(spec|test).+(ts|js)?(x)"],
  transform: {
    [`(${esModules}).+\\.js$`]: "babel-jest",
    "^.+\\.(ts|js|html)$": "ts-jest"
  },
  resolver: "@nrwl/jest/plugins/resolver",
  moduleFileExtensions: ["ts", "js", "html"],
  collectCoverage: true,
  coverageReporters: ["html"],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`]
};
