export default function calculateTotalPrice(
  items: { productId: number; quantity: number; price: number }[]
) {
  return items.reduce((total, item) => total + item.price, 0)
}
