import { createContext, useState } from 'react'

export const FilterContext = createContext()

export function FilterProvider ({ children }) {
  const [filters, setFilters] = useState({
    minPrice: 0,
    category: 'All'
  })

  return (
    <FilterContext.Provider value={
      { filters, setFilters }
    }
    >
      {children}
    </FilterContext.Provider>
  )
}
