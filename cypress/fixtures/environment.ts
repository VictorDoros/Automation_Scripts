export default class Environment {
  private urls: Record<string, string> = {
    qa: 'https://www.saucedemo.com',
    staging: 'https://www.saucedemo.com',
    prod: 'https://www.saucedemo.com',
  }

  getEnvironment(): string {
    const env = Cypress.env('env')
    return this.urls[env]
  }
}
