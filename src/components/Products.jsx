import './Products.css'
import { AddToCartIcon } from './Icons'

export function Products ({ products }) {
  return (
    <main className='products'>
      <ul>
        {
          products.slice(0, 20)?.map(product => {
            return (
              <li className='product' key={product.id}>
                <img src={product.imageurl} alt={product.name} />
                <h3>{product.name}</h3>
                <span>$ {product.price}</span>
                <span>Cantidad: {product.quantity}</span>
                <button><AddToCartIcon /></button>
              </li>
            )
          })
        }
      </ul>
    </main>
  )
}
