import Environment from '../../fixtures/environment'
import TestHelpers from '../../support/TestHelpers'
import App from '../../App'

describe('Healthcheck', { tags: ['@healthCheck'] }, () => {
  let env: Environment

  beforeEach(() => {
    env = new Environment()
  })

  it('Loading the app', () => {
    TestHelpers.defineTheStep('Access the Home Page')
    App.pages.login.visit(env)

    TestHelpers.defineTheStep('Cofirm that the app loads and has the title')
    TestHelpers.checkSiteTitle()
  })
})
