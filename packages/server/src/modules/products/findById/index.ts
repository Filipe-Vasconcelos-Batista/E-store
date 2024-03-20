import Product, { productSchema } from '@server/entities/product'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'

export default authenticatedProcedure
  .input(productSchema.shape.id)
  .mutation(async ({ input: id, ctx: { db } }) => {
    const productFound = await db.getRepository(Product).findOne({
      where: {
        id,
      },
    })
    return productFound
  })
