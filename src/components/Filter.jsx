import './Filter.css'
import { useId } from 'react'

export function Filter ({ filters, setFilters }) {
  const minPriceId = useId()
  const categorytId = useId()
  function handleMinPriceChange (value) {
    setFilters(prevState => (
      {
        ...prevState,
        minPrice: value
      }
    ))
  }
  function handleCategoryChange (value) {
    setFilters(prevState => (
      {
        ...prevState,
        category: value
      }
    ))
  }
  return (
    <header>
      <h1>HOSHIRANEAR</h1>
      <h3>Tus amigos del k-pop</h3>
      <section className='filters'>
        <div>
          <label htmlFor={minPriceId}>Mínimo:</label>
          <input
            id={minPriceId}
            type='range'
            min='0'
            max='10000'
            value={filters.minPrice}
            onChange={e => handleMinPriceChange(e.target.value)}
          /> <span>${filters.minPrice}</span>
        </div>
        <div>
          <label htmlFor={categorytId}>Categoría: </label>
          <select
            id={categorytId}
            value={filters.category}
            onChange={e => handleCategoryChange(e.target.value)}
          >
            <option value='All'>Todo</option>
            <option value='Amigurumi'>Amigurumi</option>
            <option value='Remera'>Remera</option>
            <option value='Photocard'>Photocard</option>
          </select>
        </div>
      </section>
    </header>
  )
}
