import { Cart } from '@server/entities'
import { Connection } from 'typeorm/browser'

export default async function createCart(userId: number, db: Connection) {
  const newCart = await db.getRepository(Cart).save({
    userId,
  })
  return newCart
}
