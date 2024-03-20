import Product, { productSchema } from '@server/entities/product'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'
import { Like } from 'typeorm'

export default authenticatedProcedure
  .input(productSchema.shape.title)
  .query(async ({ input: title, ctx: { db } }) => {
    const productFound = await db.getRepository(Product).find({
      where: [{ title: Like(`%${title}%`) }, { brand: Like(`%${title}%`) }],
      relations: ['images', 'category'],
    })

    if (!productFound) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message:
          'No matching products were found for the provided search criteria. Please ensure the search term is correct and try again.',
      })
    }
    return productFound
  })
