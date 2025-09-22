class Buttons {
  get logout(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="logout-sidebar-link"]')
  }
}

class AppSidebar {
  buttons: Buttons

  constructor() {
    this.buttons = new Buttons()
  }
}
export default new AppSidebar()
