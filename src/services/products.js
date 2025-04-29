export const getProducts = async () => {
  try {
    const response = await fetch('https://hoshiranear-backend.vercel.app/products')
    const res = await response.json()
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}
