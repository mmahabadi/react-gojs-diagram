import { getJestProjectsAsync } from '@nx/jest';

export default async () => ({
  projects: await getJestProjectsAsync(),
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  preset: './jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
    '^.+\\.css$': 'jest-transform-css',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: [
    '<rootDir>/src/**/*.spec.(ts|tsx)',
    '<rootDir>/ui-kit/src/**/?(*.)+(spec|test).(ts|tsx)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/e2e/'],
});
