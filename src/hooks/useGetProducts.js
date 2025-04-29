import { useState, useEffect } from 'react'
import { getProducts } from '../services/products'

export function useGetProducts () {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts().then(products => setProducts(products))
  }, [])

  return products
}
