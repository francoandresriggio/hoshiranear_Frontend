import './App.css'
import { useGetProducts } from './hooks/useGetProducts'
import { useFilters } from './hooks/useFilters'
import { Filter } from './components/Filter'
import { Products } from './components/Products'

function App () {
  const { products } = useGetProducts()
  const { filters, setFilters, filterProducts } = useFilters()
  return (
    <>
      <Filter filters={filters} setFilters={setFilters} />
      <Products products={filterProducts(products)} />
    </>
  )
}

export default App
