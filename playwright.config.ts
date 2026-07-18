import { defineConfig, devices } from '@playwright/test';
import { environment } from "./utils/env";


const baseURL = environment.baseUrl;
const headless = environment.headless;
const workers = environment.workers;

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: workers ? 1 : undefined,

  reporter: [
    ['list'],
    ['html'],
    ['allure-playwright']
  ],

  use: {

    baseURL: baseURL,
    headless: headless,
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 30000,
    navigationTimeout: 35000
  },


  projects: [
    {
      name: 'setup',
      testMatch: "**/auth/auth.setup.spec.ts",
    },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
      dependencies: ['setup'],
      testIgnore: "**/auth/auth.setup.spec.ts",

    },

    {
      name: 'api',
      testMatch: "**/tests/api/*.spec.ts"
    },

    { 
      name: 'network',
      testMatch: "**/tests/network/mocking.spec.ts"
    }
  ],

});
