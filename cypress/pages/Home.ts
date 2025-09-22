import Environment from '../fixtures/environment'

export default abstract class Home {
  /**
   * Visits the application URL based on the provided environment configuration.
   *
   * @param env - The Environment instance used to resolve the correct base URL
   *              (qa, staging, or prod) via `Cypress.env('env')`.
   */
  visit(env: Environment): void {
    cy.visit(env.getEnvironment())
  }
}
