import { useContext } from 'react'
import { ProductsContext } from '../context/products'

export function useGetProducts () {
  const products = useContext(ProductsContext)
  if (!products) {
    throw new Error('useGetProducts debe ser usado dentro de un productsProvider')
  }
  return products
}
