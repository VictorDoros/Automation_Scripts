class Views {
  get logout(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[data-test="logout-sidebar-link"]')
  }
}

class AppSidebar {
  views: Views

  constructor() {
    this.views = new Views()
  }
}
export default new AppSidebar()
