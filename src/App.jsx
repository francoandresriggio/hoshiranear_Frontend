import './App.css'
import { useGetProducts } from './hooks/useGetProducts'

function App () {
  const products = useGetProducts()
  console.log(products)
  return (
    <>
      <h1>HOSHIRANEAR</h1>
    </>
  )
}

export default App
