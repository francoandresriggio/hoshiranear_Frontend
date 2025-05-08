import './App.css'
import { useGetProducts } from './hooks/useGetProducts'
import { useFilters } from './hooks/useFilters'
import { Header } from './components/Header'
import { Products } from './components/Products'
import { Cart } from './components/Cart'
import { Footer } from './components/Footer'
import { CartProvider } from './context/cart'

function App () {
  const { products } = useGetProducts()
  const { filterProducts } = useFilters(products)
  const filteredProducts = filterProducts(products)
  return (
    <CartProvider>
      <Cart />
      <Header />
      <Products products={filteredProducts} />
      <Footer />
    </CartProvider>
  )
}

export default App
