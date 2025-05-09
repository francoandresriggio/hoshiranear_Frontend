import { useId } from 'react'
import { CartIcon, ClearCartIcon, ConfirmCartIcon } from './Icons'
import { useCart } from '../hooks/useCart'
import { useGetProducts } from '../hooks/useGetProducts'
import './Cart.css'
export function Cart () {
  const cartID = useId()
  const { products, setProducts } = useGetProducts()
  const { cart, addItemToCart, removeItemFromCart, clearCart, confirmCart } = useCart()
  return (
    <>
      <label className='cart-button' htmlFor={cartID}><CartIcon /></label>
      <input type='checkbox' id={cartID} hidden />
      <aside className='cart'>
        <ul>
          {
            cart?.map(product => {
              return (
                <li key={product.id}>
                  <img src={product.imageurl} alt={product.name} />
                  <div>
                    <strong>{product.name}</strong> - ${product.price}
                  </div>
                  <footer>
                    <small>Cantidad: {product.quantity}</small>
                    <button onClick={() => addItemToCart(product, products, setProducts)}>+</button>
                    <button onClick={() => removeItemFromCart(product, products, setProducts)}>-</button>
                  </footer>
                </li>
              )
            })
          }
        </ul>
        <div className='cart-payment'>
          <button className='clear-cart' onClick={() => clearCart(products, setProducts)}>
            <ClearCartIcon />
          </button>
          <button className='confirm-cart' onClick={() => confirmCart()}>
            <ConfirmCartIcon />
          </button>
        </div>
      </aside>
    </>
  )
}
