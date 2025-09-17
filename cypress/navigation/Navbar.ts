class Buttons {
  get openMenu(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#react-burger-menu-btn')
  }
  get cart(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="shopping-cart-link"]')
  }
}

class Views {
  get cartBadge(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="shopping-cart-badge"]')
  }
}

class Navbar {
  buttons: Buttons
  views: Views

  constructor() {
    this.buttons = new Buttons()
    this.views = new Views()
  }

  /**
   * Check how many items should display cart badge
   *
   * @param expectedNumberOfItems - Expected number to contain the cart's badge
   */
  checkCartBadgeNumber(expectedNumberOfItems: number) {
    this.views.cartBadge.invoke('text').then(items => {
      expect(Number(items)).to.eq(expectedNumberOfItems)
    })
  }
}
export default new Navbar()
