class CypressUtils {
  /**
   * Defines a test step with the given description.
   * Wrapper around `cy.step()` for clearer step reporting.
   *
   * @param description - The text used to describe the step.
   */
  defineTheStep(description: string): void {
    cy.step(description)
  }

  /**
   * Confirms that the site has a non-empty title after it is accessed, and its value is 'Swag Labs'.
   * Used as a healthcheck to confirm the website is accessible and functioning.
   *
   */
  checkSiteTitle(): void {
    cy.title().should('not.be.empty').and('eq', 'Swag Labs')
  }

  /**
   * Waits until the current page URL contains the expected path segment.
   * Useful for verifying navigation to a different page.
   *
   * @param url - The path or substring that should be included in the full URL (e.g. "/inventory.html").
   */
  waitForUrlToInclude(URL: string): void {
    cy.location('href', { timeout: 5000 }).should('include', URL)
  }
}

export default new CypressUtils()
