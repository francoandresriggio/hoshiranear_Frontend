import { createContext, useReducer, useEffect } from 'react'
import { getProducts } from '../services/products'
import { productsReducer, ProductsInitialState } from '../reducers/products'

export const ProductsContext = createContext()

function useProducts () {
  const [products, dispatch] = useReducer(productsReducer, ProductsInitialState)

  const increaseStock = (productId, quantity = 1) => {
    dispatch({ type: 'INCREASE_STOCK', payload: { id: productId, quantity } })
  }
  const decreaseStock = productId => {
    const newStock = [...products]
    const productIndex = products.findIndex(item => item.id === productId)
    if (newStock[productIndex].quantity <= 0) return false
    dispatch({ type: 'DECREASE_STOCK', payload: { id: productId } })
    return true
  }
  const resetStock = () => {
    dispatch({ type: 'RESET_STOCK' })
  }

  function GetInitialProducts () {
    getProducts().then(products => {
      window.localStorage.setItem('stock_available', JSON.stringify(products))
      dispatch({ type: 'SET_PRODUCTS_FROM_API', payload: products })
    })
  }
  useEffect(() => {
    if (products.length === 0) GetInitialProducts()
  }, [])

  return { products, increaseStock, decreaseStock, resetStock }
}

export function ProductsProvider ({ children }) {
  const { products, increaseStock, decreaseStock, resetStock } = useProducts()

  return (
    <ProductsContext.Provider value={{ products, increaseStock, decreaseStock, resetStock }}>
      {children}
    </ProductsContext.Provider>
  )
}
