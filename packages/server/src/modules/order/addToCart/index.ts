import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'
import CartItem, { cartItemInsertSchema } from '../../../entities/cartItem'
import findCartById from '../utils/findOrderById'

export default authenticatedProcedure
  .input(cartItemInsertSchema)
  .mutation(async ({ input: itemData, ctx: { authUser, db } }) => {
    if (authUser.authorization !== 'buyer') {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'you do not have the required authorization',
      })
    } else {
      const cartId = await findCartById(authUser.id, db)
      if (!cartId) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'you do not have a created Cart, please contact us',
        })
      }
      const newInsert = {
        cartId,
        productId: itemData.productId,
        quantity: itemData.quantity,
        complete: false,
      }
      const newItem = await db.getRepository(CartItem).save(newInsert)
      return newItem
    }
  })
