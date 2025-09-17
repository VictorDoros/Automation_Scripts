/// <reference types="cypress" />

declare namespace Cypress {
  interface EnvConfig {
    env: 'qa' | 'staging' | 'prod'
  }

  // Override Cypress.env to be typed
  function env<T extends keyof EnvConfig>(key: T): EnvConfig[T]
}
