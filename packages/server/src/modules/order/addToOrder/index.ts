import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'
import OrderItem, {
  OrderItemStatus,
  orderItemArraySchema,
} from '../../../entities/orderItems'
import createOrder from '../utils/createOrder'
import findOrderItemPrice from '../utils/findOrderItemPrice'
import calculateTotalPrice from '../utils/findTotal'

export default authenticatedProcedure
  .input(orderItemArraySchema)
  .mutation(async ({ input: orderData, ctx: { authUser, db } }) => {
    if (authUser.authorization !== 'buyer') {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'you do not have the required authorization',
      })
    } else {
      const pricedItems = await findOrderItemPrice(orderData, db)
      const total = calculateTotalPrice(pricedItems)
      const newOrder = await createOrder(authUser.id, total, db)

      const orderItems = pricedItems.map((item) => ({
        ...item,
        orderId: newOrder.id,
        status: OrderItemStatus.Sold,
      }))

      const newItems = await db.getRepository(OrderItem).save(orderItems)

      return {
        order: newOrder,
        items: newItems,
      }
    }
  })
