class Output {
  get inventoryItem(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="inventory-item"]')
  }
}

class Buttons {
  get checkout(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="checkout"]')
  }
}

class Cart {
  output: Output
  buttons: Buttons

  constructor() {
    this.output = new Output()
    this.buttons = new Buttons()
  }
}

export default new Cart()
