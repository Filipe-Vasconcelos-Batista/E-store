import { Order } from '@server/entities'
import { OrderStatus } from '@server/entities/order'
import { Connection } from 'typeorm/browser'

export default async function createOrder(
  userId: number,
  total: number,
  db: Connection
) {
  const newOrder = await db.getRepository(Order).save({
    userId,
    total,
    status: OrderStatus.Waiting,
  })
  return newOrder
}
