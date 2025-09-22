import LoginPage from './pages/LoginPage'
import InventoryPage from './pages/InventoryPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import AppSidebar from './navigation/AppSidebar'
import Topbar from './navigation/Topbar'

class Pages {
  get login() {
    return LoginPage
  }
  get inventory() {
    return InventoryPage
  }
  get cart() {
    return CartPage
  }
  get checkout() {
    return CheckoutPage
  }
}

class Navigation {
  get appSidebar() {
    return AppSidebar
  }
  get topBar() {
    return Topbar
  }
}

class Website {
  pages = new Pages()
  navigation = new Navigation()
}

export default new Website()
