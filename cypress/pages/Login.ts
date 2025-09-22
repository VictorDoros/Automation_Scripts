import Home from './HomeP'

class Inputs {
  get username(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="username"]')
  }

  get password(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="password"]')
  }
}

class Buttons {
  get login(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="login-button"]')
  }
}

class Views {
  get errorContainer(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="error"]')
  }
}

class Login extends Home {
  inputs: Inputs
  buttons: Buttons
  views: Views

  constructor() {
    super()
    this.inputs = new Inputs()
    this.buttons = new Buttons()
    this.views = new Views()
  }

  /**
   * Logs in a user by typing the provided credentials and clicking the login button.
   *
   * @param username - The username to enter in the login form.
   * @param password - The password to enter in the login form.
   */
  loginUser(username: string, password: string) {
    this.inputs.username.type(username)
    this.inputs.password.type(password)
    this.buttons.login.click()
  }
}

export default new Login()
