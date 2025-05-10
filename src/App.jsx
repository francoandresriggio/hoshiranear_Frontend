import './App.css'
import { Header } from './components/Header/Header'
import { Products } from './components/Products/Products'
import { Cart } from './components/Cart/Cart'
import { Footer } from './components/Footer/Footer'
import { CartProvider } from './context/cart'

function App () {
  return (
    <CartProvider>
      <Cart />
      <Header />
      <Products />
      <Footer />
    </CartProvider>
  )
}

export default App
