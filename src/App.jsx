import './App.css'
import { Header } from './components/Header'
import { Products } from './components/Products'
import { Cart } from './components/Cart'
import { Footer } from './components/Footer'
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
