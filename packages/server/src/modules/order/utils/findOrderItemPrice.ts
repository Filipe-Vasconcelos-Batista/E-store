import { Product } from '@server/entities'
import { Connection } from 'typeorm/browser'

export default async function findOrderItemPrice(
  items: { productId: number; quantity: number }[],
  db: Connection
) {
  const prices = await Promise.all(
    items.map(async (item) => {
      const product = await db
        .getRepository(Product)
        .findOne({ where: { id: item.productId } })
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`)
      }
      return { ...item, price: product.price * item.quantity }
    })
  )

  return prices
}
