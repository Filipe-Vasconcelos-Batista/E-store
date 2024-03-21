import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'
import CartItem, { cartItemSchema } from '../../../entities/cartItem'

export default authenticatedProcedure
  .input(cartItemSchema)
  .mutation(async ({ input: itemData, ctx: { authUser, db } }) => {
    if (authUser.authorization !== 'buyer') {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'you do not have the required authorization',
      })
    } else {
      const deleted = await db.getRepository(CartItem).delete(itemData.id)
      return deleted
    }
  })
