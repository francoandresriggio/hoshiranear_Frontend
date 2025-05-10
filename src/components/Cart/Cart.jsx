import { useId } from 'react'
import { CartIcon, ClearCartIcon, ConfirmCartIcon } from '../Icons/Icons'
import { useCart } from '../../hooks/useCart'
import { useGetProducts } from '../../hooks/useGetProducts'
import './Cart.css'
export function Cart () {
  const cartID = useId()
  const { increaseStock, decreaseStock, resetStock } = useGetProducts()
  const { cart, addItemToCart, removeItemFromCart, clearCart, confirmCart, getTotal } = useCart()
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
                  <img src={product.image} alt={product.name} />
                  <div>
                    <strong>{product.name}</strong> - ${product.price}
                  </div>
                  <footer>
                    <small>Cantidad: {product.quantity}</small>
                    <button onClick={() => addItemToCart(product, decreaseStock)}>+</button>
                    <button onClick={() => removeItemFromCart(product, increaseStock)}>-</button>
                  </footer>
                </li>
              )
            })
          }
        </ul>
        <div>
          <strong>Total: ${getTotal(cart)}</strong>
        </div>
        <div className='cart-payment-buttons'>
          <button className='clear-cart' onClick={() => clearCart(cart, increaseStock)}>
            <ClearCartIcon />
          </button>
          <button className='confirm-cart' onClick={() => confirmCart(resetStock)}>
            <ConfirmCartIcon />
          </button>
        </div>
      </aside>
    </>
  )
}
