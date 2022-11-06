import { Route, Switch, Redirect } from 'react-router-dom'
import { useState } from "react"
import Header from "./components/Layout/Header"
import Main from "./components/Layout/Main"
import AvailableProducts from "./pages/AvailableProducts"
import Cart from "./components/Cart/Cart"
import CartProvider from "./store/CartProvider"
import DetailProduct from './pages/DetailProduct'
import BreadCrumb from './components/Layout/BreadCrumb'
import "../src/styles/App.css"

const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true)
  }
  const hideCartHandler = () => {
    setCartIsShown(false)
  }
  return (
    <CartProvider>
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <BreadCrumb />
      <Main>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>
          <Route path='/home'>
            <AvailableProducts />
          </Route>
          <Route path='/products/:productId'>
            <DetailProduct />
          </Route>
        </Switch>
      </Main>
    </CartProvider>
  )
}

export default App