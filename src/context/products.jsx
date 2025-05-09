import { createContext, useState, useEffect } from 'react'
import { getProducts } from '../services/products'

export const ProductsContext = createContext()

export function ProductsProvider ({ children }) {
  const [products, setProducts] = useState([])

  const increaseStock = (productId, quantity = 1) => {
    const newStock = [...products]
    const productIndex = products.findIndex(item => item.id === productId)
    newStock[productIndex].quantity += quantity
    setProducts(newStock)
    window.localStorage.setItem('stock_available', JSON.stringify(newStock))
  }
  const decreaseStock = productId => {
    const newStock = [...products]
    const productIndex = products.findIndex(item => item.id === productId)
    if (newStock[productIndex].quantity <= 0) return false
    newStock[productIndex].quantity -= 1
    setProducts(newStock)
    window.localStorage.setItem('stock_available', JSON.stringify(newStock))
    return true
  }
  const resetStock = () => {
    if (products.filter(product => product.quantity > 0).length === 0) {
      window.localStorage.removeItem('stock_available')
    }
  }
  useEffect(() => {
    if (window.localStorage.getItem('stock_available')) return setProducts(JSON.parse(window.localStorage.getItem('stock_available')))
    getProducts().then(products => {
      setProducts(products)
      window.localStorage.setItem('stock_available', JSON.stringify(products))
    })
  }, [])

  return (
    <ProductsContext.Provider value={{ products, setProducts, increaseStock, decreaseStock, resetStock }}>
      {children}
    </ProductsContext.Provider>
  )
}
