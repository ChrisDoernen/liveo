const esModules = ["ngx-socket-io", "ng-inline-svg"].join("|");

module.exports = {
  testMatch: ["**/+(*.)+(spec|test).+(ts|js)?(x)"],
  transform: {
    [`(${esModules}).+\\.js$`]: "babel-jest",
    "^.+\\.(ts|js|html)$": "ts-jest"
  },
  resolver: "@nrwl/jest/plugins/resolver",
  moduleFileExtensions: ["ts", "js", "html"],
  coverageReporters: ["html"],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`]
};
