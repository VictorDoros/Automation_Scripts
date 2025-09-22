import Environment from '../../fixtures/environment'
import TestHelpers from '../../support/TestHelpers'
import App from '../../App'
import user from '../../fixtures/user'

describe('Checkout flow', { tags: ['@checkout'] }, () => {
  let env: Environment
  beforeEach(() => {
    env = new Environment()

    TestHelpers.defineTheStep('Access the Home Page')
    App.pages.login.visit(env)

    TestHelpers.defineTheStep('Fill in the fields and log in')
    App.pages.login.loginUser(user.validUser.username, user.validUser.password)
  })

  it('Add a product and finish the checkout', () => {
    TestHelpers.defineTheStep('Add the first item to the cart')
    App.pages.inventory.getFirstItem()

    TestHelpers.defineTheStep('Verify that the cart badge shows 1 item')
    App.navigation.topBar.checkCartBadgeNumber(1)

    TestHelpers.defineTheStep('Open the cart and verify that the user was redirected to cart page')
    App.navigation.topBar.buttons.cart.click()
    TestHelpers.waitForUrlToInclude('/cart.html')

    TestHelpers.defineTheStep('Verify that the cart contains 1 item')
    App.pages.cart.output.inventoryItem.should('have.length', 1)

    TestHelpers.defineTheStep('Proceed to checkout and verify that the user is redirected to the checkout page')
    App.pages.cart.buttons.checkout.click()
    TestHelpers.waitForUrlToInclude('checkout-step-one.html')
    App.pages.checkout.fillCheckoutForm('Jack', 'Sparrow', '0123')

    TestHelpers.defineTheStep('Finish the checkout process')
    App.pages.checkout.buttons.finish.click()

    TestHelpers.defineTheStep('Verify that checkout completed successfully')
    TestHelpers.waitForUrlToInclude('/checkout-complete.html')
    App.pages.checkout.output.completeHeader.should('be.visible').and('have.text', 'Thank you for your order!')
  })
})
