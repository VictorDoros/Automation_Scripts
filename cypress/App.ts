import LoginPage from './pages/LoginPage'
import InventoryPage from './pages/InventoryPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import MainSidebar from './navigation/MainSidebar'
import Navbar from './navigation/Navbar'

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
  get mainSidebar() {
    return MainSidebar
  }
  get navBar() {
    return Navbar
  }
}

class Website {
  pages = new Pages()
  navigation = new Navigation()
}

export default new Website()
