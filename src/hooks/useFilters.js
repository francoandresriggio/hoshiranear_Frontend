import { useContext } from 'react'
import { FilterContext } from '../context/filter'

export function useFilters () {
  const { filters, setFilters } = useContext(FilterContext)
  const filterProducts = products => {
    const { minPrice, category } = filters
    return products.filter(product => {
      return (
        product.price >= minPrice &&
        (category === 'All' || product.category === category) &&
        product.quantity > 0
      )
    }
    )
  }
  return { filters, setFilters, filterProducts }
}
