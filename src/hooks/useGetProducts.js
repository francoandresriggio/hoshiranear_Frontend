import { useState, useEffect } from 'react'
import { getProducts } from '../services/products'

export function useGetProducts () {
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (window.localStorage.getItem('stock_available')) return setProducts(JSON.parse(window.localStorage.getItem('stock_available')))
    getProducts().then(products => setProducts(products))
  }, [])

  return { products }
}
