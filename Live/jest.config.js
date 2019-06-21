const esModules = ['ngx-socket-io'].join('|');

module.exports = {
  preset: "jest-preset-angular",
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    [`(${esModules}).+\\.js$`]: 'babel-jest',
    '^.+\\.(ts|html)$': 'ts-jest'
  },
  resolver: '@nrwl/builders/plugins/jest/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  collectCoverage: true,
  coverageReporters: ['html'],
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`]
};
