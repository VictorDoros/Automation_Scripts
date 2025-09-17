class Inputs {
  get firstName(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="firstName"]')
  }

  get lastName(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="lastName"]')
  }

  get postalCode(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="postalCode"]')
  }
}
class Buttons {
  get continue(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="continue"]')
  }

  get finish(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="finish"]')
  }
}

class Views {
  get completeHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="complete-header"]')
  }
}

class Checkout {
  inputs: Inputs
  buttons: Buttons
  views: Views

  constructor() {
    this.inputs = new Inputs()
    this.buttons = new Buttons()
    this.views = new Views()
  }

  /**
   * Fills in the checkout form with the provided user information
   * and proceeds to the next step.
   *
   * @param firstName - The first name to enter in the checkout form.
   * @param lastName - The last name to enter in the checkout form.
   * @param postalCode - The postal code to enter in the checkout form.
   */
  fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    this.inputs.firstName.type(firstName)
    this.inputs.lastName.type(lastName)
    this.inputs.postalCode.type(postalCode)
    this.buttons.continue.click()
  }
}

export default new Checkout()
