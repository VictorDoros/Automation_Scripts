import { defineConfig } from 'cypress'

export default defineConfig({
  // Retry failed tests: 2 retries in "cypress run", none in "cypress open"
  retries: {
    runMode: 2,
    openMode: 0,
  },

  // Use Mochawesome reporter for generating detailed test reports
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    inlineAssets: true,
    saveAllAttempts: false,
  },

  e2e: {
    env: {
      grepFilterSpecs: true, // run only matching tests
      grepOmitFiltered: true, // omit non-matching tests from run
    },

    setupNodeEvents(on, config) {
      // Enable Mochawesome reporter plugin
      require('cypress-mochawesome-reporter/plugin')(on)

      // Enable cy-grep plugin for test filtering
      require('@cypress/grep/src/plugin')(config)
      return config
    },

    // Take screenshot on test failure during "cypress run"
    screenshotOnRunFailure: true,

    // Video compression: lower = better quality, higher size. Disable with `false`.
    videoCompression: 32,

    // Default browser viewport size
    viewportHeight: 1080,
    viewportWidth: 1920,

    // Disable video recording (saves time if not needed)
    video: false,
  },
})
