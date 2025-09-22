import Environment from '../../fixtures/environment'
import TestHelpers from '../../support/TestHelpers'
import App from '../../App'
import user from '../../fixtures/user'

describe('Log in - Functional', { tags: ['@auth'] }, () => {
  let env: Environment
  beforeEach(() => {
    env = new Environment()

    TestHelpers.defineTheStep('Access the Home Page')
    App.pages.login.visit(env)
  })

  it('Should be able to log in and log out', () => {
    TestHelpers.defineTheStep('Fill in the fields and log in')
    App.pages.login.loginUser(user.validUser.username, user.validUser.password)

    TestHelpers.defineTheStep('Confirm that the user is logged in (inventory page)')
    TestHelpers.waitForUrlToInclude('/inventory.html')

    TestHelpers.defineTheStep('Log out through the sidebar menu')
    App.navigation.topBar.buttons.openMenu.click()
    App.navigation.appSidebar.buttons.logout.click()

    TestHelpers.defineTheStep('Confirm that the user is logged out (login form visible)')
    App.pages.login.buttons.login.should('be.visible')
  })

  it('Login fails with wrong password', () => {
    TestHelpers.defineTheStep('Attempt login with a wrong password')
    App.pages.login.loginUser(user.badUser.username, user.badUser.password)

    TestHelpers.defineTheStep('Verify that the error message is shown')
    App.pages.login.output.errorContainer.should('be.visible').and('contain.text', 'Username and password do not match')
  })

  it('Login fails with locked user', () => {
    TestHelpers.defineTheStep('Attempt login with a locked account')
    App.pages.login.loginUser(user.lockedUser.username, user.lockedUser.password)

    TestHelpers.defineTheStep('Verify that the error message is shown')
    App.pages.login.output.errorContainer
      .should('be.visible')
      .and('contain.text', 'Sorry, this user has been locked out')
  })
})
