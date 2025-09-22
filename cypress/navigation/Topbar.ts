class Buttons {
  get openMenu(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('#react-burger-menu-btn')
  }
  get cart(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="shopping-cart-link"]')
  }
}

class Output {
  get cartBadge(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="shopping-cart-badge"]')
  }
}

class Topbar {
  buttons: Buttons
  ouput: Output

  constructor() {
    this.buttons = new Buttons()
    this.ouput = new Output()
  }

  /**
   * Check how many items should display cart badge
   *
   * @param expectedNumberOfItems - Expected number to contain the cart's badge
   */
  checkCartBadgeNumber(expectedNumberOfItems: number) {
    this.ouput.cartBadge.invoke('text').then(items => {
      expect(Number(items)).to.eq(expectedNumberOfItems)
    })
  }
}
export default new Topbar()
