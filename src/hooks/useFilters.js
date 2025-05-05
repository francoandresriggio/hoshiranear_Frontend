import { useState } from 'react'

export function useFilters () {
  const [filters, setFilters] = useState({
    minPrice: 0,
    category: 'All'
  })
  const filterProducts = products => {
    const { minPrice, category } = filters
    return products.filter(product => {
      return (
        product.price >= minPrice &&
        (category === 'All' || product.category === category)
      )
    }
    )
  }
  return { filters, setFilters, filterProducts }
}
