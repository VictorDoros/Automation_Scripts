class Buttons {
  get addToCart(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test*="add-to-cart"]')
  }
}

class Output {
  get inventoryItem(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="inventory-item"]')
  }
}

class Inventory {
  buttons: Buttons
  output: Output

  constructor() {
    this.buttons = new Buttons()
    this.output = new Output()
  }

  /**
   * Adds the first inventory item to the cart by clicking its [Add to cart] button.
   */
  getFirstItem() {
    return this.output.inventoryItem.first().within(() => {
      this.buttons.addToCart.click()
    })
  }
}

export default new Inventory()
