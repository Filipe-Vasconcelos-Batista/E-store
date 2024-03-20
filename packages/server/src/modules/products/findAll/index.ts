import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { z } from 'zod'
import Product from '../../../entities/product'

const inputSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
})
export default authenticatedProcedure
  .input(inputSchema)
  .query(async ({ input, ctx: { db } }) => {
    const limit = input.limit ?? 100
    const offset = input.offset ?? 0
    const found = await db
      .getRepository(Product)
      .find({ take: limit, skip: offset, relations: ['images', 'category'] })
    return found
  })
