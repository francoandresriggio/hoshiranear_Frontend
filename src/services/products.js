export const getProducts = async () => {
  try {
    const response = await fetch('https://hoshiranear-backend.vercel.app/products')
    const res = await response.json()
    return res.data?.map(product => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        quantity: product.quantity,
        image: product.imageurl
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}
