import { createContext, useState, useEffect } from 'react'
import { getProducts } from '../services/products'

export const ProductsContext = createContext()

export function ProductsProvider ({ children }) {
  const [products, setProducts] = useState([])
  useEffect(() => {
    if (window.localStorage.getItem('stock_available')) return setProducts(JSON.parse(window.localStorage.getItem('stock_available')))
    getProducts().then(products => {
      setProducts(products)
      window.localStorage.setItem('stock_available', JSON.stringify(products))
    })
  }, [])

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}
