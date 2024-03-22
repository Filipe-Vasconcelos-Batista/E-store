import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { buyer } from '@server/utils/userBuyerAdminValidation'
import CartItem, { cartItemSchema } from '../../../entities/cartItem'

export default authenticatedProcedure
  .input(cartItemSchema)
  .mutation(async ({ input: itemData, ctx: { authUser, db } }) => {
    buyer(authUser.authorization)
    const deleted = await db.getRepository(CartItem).delete(itemData.id)
    return deleted
  })
