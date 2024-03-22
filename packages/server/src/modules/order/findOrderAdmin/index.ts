import { Order } from '@server/entities'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure.query(
  async ({ ctx: { authUser, db } }) => {
    if (authUser.authorization !== 'admin') {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'you do not have the required authorization',
      })
    } else {
      const orderFound = await db
        .getRepository(Order)
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.orderItems', 'orderItem')
        .leftJoinAndSelect('orderItem.product', 'product')
        .leftJoinAndSelect('product.images', 'image')
        .getMany()

      return orderFound
    }
  }
)
