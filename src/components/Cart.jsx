import { useId } from 'react'
import { CartIcon, ClearCartIcon, ConfirmCartIcon } from './Icons'
import './Cart.css'
export function Cart () {
  const cartID = useId()
  return (
    <>
      <label className='cart-button' htmlFor={cartID}><CartIcon /></label>
      <input type='checkbox' id={cartID} hidden />
      <aside className='cart'>
        <ul>
          <li>
            <img src='https://z7kvojring68mj6o.public.blob.vercel-storage.com/koia-HEAP29NhXX5z46CKC6h7XXu2pW6mwx.jpg' alt='Llavero RJ' />
            <div>
              <strong>Llavero RJ</strong> - $7500
            </div>
            <footer>
              <small>Cantidad: 1</small>
              <button>+</button>
              <button>-</button>
            </footer>
          </li>
        </ul>
        <div className='cart-payment'>
          <button className='clear-cart'>
            <ClearCartIcon />
          </button>
          <button className='confirm-cart'>
            <ConfirmCartIcon />
          </button>
        </div>
      </aside>
    </>
  )
}
