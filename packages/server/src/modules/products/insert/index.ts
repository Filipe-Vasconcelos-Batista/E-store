import Product, { productInsertSchema } from '@server/entities/product'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { admin } from '@server/utils/userBuyerAdminValidation'

export default authenticatedProcedure
  .input(productInsertSchema)
  .mutation(async ({ input: productData, ctx: { authUser, db } }) => {
    admin(authUser.authorization)
    const newProduct = db.getRepository(Product).save(productData)
    return newProduct
  })
