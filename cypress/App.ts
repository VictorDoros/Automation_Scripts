import Login from './pages/Login'
import Inventory from './pages/Inventory'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import AppSidebar from './navigation/AppSidebar'
import Topbar from './navigation/Topbar'

class Pages {
  get login() {
    return Login
  }
  get inventory() {
    return Inventory
  }
  get cart() {
    return Cart
  }
  get checkout() {
    return Checkout
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
