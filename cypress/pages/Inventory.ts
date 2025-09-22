class Buttons {
  get addToCart(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test*="add-to-cart"]')
  }
}

class Views {
  get inventoryItem(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="inventory-item"]')
  }
}

class Inventory {
  buttons: Buttons
  views: Views

  constructor() {
    this.buttons = new Buttons()
    this.views = new Views()
  }

  /**
   * Adds the first inventory item to the cart by clicking its [Add to cart] button.
   */
  getFirstItem() {
    return this.views.inventoryItem.first().within(() => {
      this.buttons.addToCart.click()
    })
  }
}

export default new Inventory()
