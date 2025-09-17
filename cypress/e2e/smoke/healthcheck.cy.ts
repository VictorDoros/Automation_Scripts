import Environment from '../../fixtures/environment'
import CypressUtils from '../../support/CypressUtils'
import Website from '../../Website'

describe('Healthcheck', { tags: ['@healthCheck'] }, () => {
  let env: Environment

  beforeEach(() => {
    env = new Environment()
  })

  it('Loading the app', () => {
    CypressUtils.defineTheStep('Access the Home Page')
    Website.pages.login.visit(env)

    CypressUtils.defineTheStep('Cofirm that the app loads and has the title')
    CypressUtils.checkSiteTitle()
  })
})
