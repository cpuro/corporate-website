module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  setupFiles: ['<rootDir>/jest.setup.cjs'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg|webp)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(svg)\\?react$': '<rootDir>/__mocks__/svgMock.js',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/main.jsx',
    '!src/index.css',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  // Ratchet: set just below the measured coverage so it can only go up.
  // Measured 2026-09 (npx jest --coverage): stmts 11.22 / branch 9.91 /
  // funcs 8.09 / lines 12.32. Raise these as coverage improves.
  coverageThreshold: {
    global: {
      branches: 9,
      functions: 8,
      lines: 12,
      statements: 11,
    },
  },
};
