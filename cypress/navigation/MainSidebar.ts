class Views {
  get logout(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="logout-sidebar-link"]')
  }
}

class MainSidebar {
  views: Views

  constructor() {
    this.views = new Views()
  }
}
export default new MainSidebar()
