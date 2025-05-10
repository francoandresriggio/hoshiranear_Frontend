import './Products.css'
import { AddToCartIcon } from '../Icons/Icons'
import { useCart } from '../../hooks/useCart'
import { useGetProducts } from '../../hooks/useGetProducts'
import { useFilters } from '../../hooks/useFilters'

export function Products () {
  const { cart, addItemToCart, removeProductFromCart } = useCart()

  const { products, increaseStock, decreaseStock } = useGetProducts()
  const { filterProducts } = useFilters(products)
  const filteredProducts = filterProducts(products)

  const changeCartItemQuantity = (product, isProductInCart, addItemToCart, removeProductFromCart) => {
    if (isProductInCart) {
      removeProductFromCart(product, increaseStock)
    } else {
      addItemToCart(product, decreaseStock)
    }
  }
  return (
    <main className='products'>
      <ul>
        {
          filteredProducts.slice(0, 20)?.map(product => {
            const isProductInCart = cart.some(item => item.id === product.id)
            return (
              <li className='product' key={product.id}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <span>$ {product.price}</span>
                <span>Cantidad: {product.quantity}</span>
                <button
                  onClick={() => changeCartItemQuantity(product, isProductInCart, addItemToCart, removeProductFromCart)}
                  style={{
                    backgroundColor: isProductInCart ? 'red' : 'green',
                    transition: 'all .3s ease'
                  }}
                >
                  <AddToCartIcon />
                </button>
              </li>
            )
          })
        }
      </ul>
    </main>
  )
}
