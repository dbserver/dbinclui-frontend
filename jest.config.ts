import type { Config } from '@jest/types';

export const config = async (): Promise<Config.InitialOptions> => ({
  verbose: true,
  rootDir: '.',
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{tsx,jsx,ts,js}',
    '!/node_modules/**',
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  modulePaths: ['<rootDir>/src', 'node_modules'],
  passWithNoTests: true,
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '@components/(.*)': ['<rootDir>/src/components/$1'],
    '@contexts/(.*)': ['<rootDir>/src/contexts/$1'],
    '@hooks/(.*)': ['<rootDir>/src/hooks/$1'],
    '@interfaces/(.*)': ['<rootDir>/src/interfaces/$1'],
    '@pages/(.*)': ['<rootDir>/src/pages/$1'],
    '@routes/(.*)': ['<rootDir>/src/routes/$1'],
    '@services/(.*)': ['<rootDir>/src/services/$1'],
    '@shared/(.*)': ['<rootDir>/src/shared/$1'],
    '@styles/(.*)': ['<rootDir>/src/styles/$1'],
    '@tests/(.*)': ['<rootDir>/src/tests/$1'],
  },
  transformIgnorePatterns: ['/node_modules/(?!axios)']
});

export default config;
