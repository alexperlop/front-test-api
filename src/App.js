import Header from "./components/Layout/Header"

import "../src/styles/App.css"
import Main from "./components/Layout/Main"
import { useState } from "react"
import AvailableProducts from "./components/Products/AvailableProducts"
import Cart from "./components/Cart/Cart"
import CartProvider from "./store/CartProvider"

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
      <Main>
        <AvailableProducts />
      </Main>
    </CartProvider>
  )
}

export default App
