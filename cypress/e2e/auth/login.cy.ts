import Environment from '../../fixtures/environment'
import CypressUtils from '../../support/CypressUtils'
import Website from '../../Website'
import user from '../../fixtures/user'

describe('Log in - Functional', { tags: ['@auth'] }, () => {
  let env: Environment
  beforeEach(() => {
    env = new Environment()

    CypressUtils.defineTheStep('Access the Home Page')
    Website.pages.login.visit(env)
  })

  it('Should be able to log in and log out', () => {
    CypressUtils.defineTheStep('Fill in the fields and log in')
    Website.pages.login.loginUser(user.validUser.username, user.validUser.password)

    CypressUtils.defineTheStep('Confirm that the user is logged in (inventory page)')
    CypressUtils.waitForUrlToInclude('/inventory.html')

    CypressUtils.defineTheStep('Log out through the sidebar menu')
    Website.navigation.navBar.buttons.openMenu.click()
    Website.navigation.mainSidebar.views.logout.click()

    CypressUtils.defineTheStep('Confirm that the user is logged out (login form visible)')
    Website.pages.login.buttons.login.should('be.visible')
  })

  it('Login fails with wrong password', () => {
    CypressUtils.defineTheStep('Attempt login with a wrong password')
    Website.pages.login.loginUser(user.badUser.username, user.badUser.password)

    CypressUtils.defineTheStep('Verify that the error message is shown')
    Website.pages.login.views.errorContainer
      .should('be.visible')
      .and('contain.text', 'Username and password do not match')
  })

  it('Login fails with locked user', () => {
    CypressUtils.defineTheStep('Attempt login with a locked account')
    Website.pages.login.loginUser(user.lockedUser.username, user.lockedUser.password)

    CypressUtils.defineTheStep('Verify that the error message is shown')
    Website.pages.login.views.errorContainer
      .should('be.visible')
      .and('contain.text', 'Sorry, this user has been locked out')
  })
})
