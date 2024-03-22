export default function findTotal(
  items: { productId: number; quantity: number; price: number }[]
) {
  return items.reduce((total, item) => total + item.price, 0)
}
