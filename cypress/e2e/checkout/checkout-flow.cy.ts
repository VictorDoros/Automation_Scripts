import Environment from '../../fixtures/environment'
import CypressUtils from '../../support/CypressUtils'
import App from '../../App'
import user from '../../fixtures/user'

describe('Checkout flow', { tags: ['@checkout'] }, () => {
  let env: Environment
  beforeEach(() => {
    env = new Environment()

    CypressUtils.defineTheStep('Access the Home Page')
    App.pages.login.visit(env)

    CypressUtils.defineTheStep('Fill in the fields and log in')
    App.pages.login.loginUser(user.validUser.username, user.validUser.password)
  })

  it('Add a product and finish the checkout', () => {
    CypressUtils.defineTheStep('Add the first item to the cart')
    App.pages.inventory.getFirstItem()

    CypressUtils.defineTheStep('Verify that the cart badge shows 1 item')
    App.navigation.navBar.checkCartBadgeNumber(1)

    CypressUtils.defineTheStep('Open the cart and verify that the user was redirected to cart page')
    App.navigation.navBar.buttons.cart.click()
    CypressUtils.waitForUrlToInclude('/cart.html')

    CypressUtils.defineTheStep('Verify that the cart contains 1 item')
    App.pages.cart.views.inventoryItem.should('have.length', 1)

    CypressUtils.defineTheStep('Proceed to checkout and verify that the user is redirected to the checkout page')
    App.pages.cart.buttons.checkout.click()
    CypressUtils.waitForUrlToInclude('checkout-step-one.html')
    App.pages.checkout.fillCheckoutForm('Jack', 'Sparrow', '0123')

    CypressUtils.defineTheStep('Finish the checkout process')
    App.pages.checkout.buttons.finish.click()

    CypressUtils.defineTheStep('Verify that checkout completed successfully')
    CypressUtils.waitForUrlToInclude('/checkout-complete.html')
    App.pages.checkout.views.completeHeader.should('be.visible').and('have.text', 'Thank you for your order!')
  })
})
