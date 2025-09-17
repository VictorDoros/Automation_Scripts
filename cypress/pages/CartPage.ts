class Views {
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
  views: Views
  buttons: Buttons

  constructor() {
    this.views = new Views()
    this.buttons = new Buttons()
  }
}

export default new Cart()
