import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'
import { buyer } from '@server/utils/userBuyerAdminValidation'
import CartItem, { cartItemInsertSchema } from '../../../entities/cartItem'
import findCartById from '../utils/findCartById'

export default authenticatedProcedure
  .input(cartItemInsertSchema)
  .mutation(async ({ input: itemData, ctx: { authUser, db } }) => {
    buyer(authUser.authorization)
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
  })
