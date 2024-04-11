import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',

  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,
  projects: [
    {
      name: 'user session management',
      testMatch: /global\.setup\.ts/,
      teardown: 'logout user session',
    },
    {
      name: 'logout user session',
      testMatch: /global\.teardown\.ts/,
    },
    {
      name: 'initial',
      dependencies: ['user session management'],
      testMatch: /initial\.spec\.ts/,
    },
    {
      name: 'core',
      dependencies: ['initial'],
      testMatch: /core\.spec\.ts/,
    }
  ]
});