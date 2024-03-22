import { Order } from '@server/entities'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { admin } from '@server/utils/userBuyerAdminValidation'

export default authenticatedProcedure.query(
  async ({ ctx: { authUser, db } }) => {
    admin(authUser.authorization)
    const orderFound = await db
      .getRepository(Order)
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderItems', 'orderItem')
      .leftJoinAndSelect('orderItem.product', 'product')
      .leftJoinAndSelect('product.images', 'image')
      .getMany()

    return orderFound
  }
)
