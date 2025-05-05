import './Products.css'
import { AddToCartIcon } from './Icons'

export function Products ({ products }) {
  return (
    <main className='products'>
      <ul>
        {
          products.map(product => {
            return (
              <li className='product' key={product.id}>
                <img src={product.imageurl} alt={product.name} />
                <h3>{product.name}</h3>
                <span>$ {product.price}</span>
                <button><AddToCartIcon /></button>
              </li>
            )
          })
        }
      </ul>
    </main>
  )
}
