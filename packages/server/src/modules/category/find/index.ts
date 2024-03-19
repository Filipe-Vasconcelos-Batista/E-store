import Category, { categoryInsertSchema } from '@server/entities/category'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure
  .input(categoryInsertSchema)
  .mutation(async ({ input: categoryData, ctx: { authUser, db } }) => {
    if (authUser.authorization !== 'admin') {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'you do not have the required authorization',
      })
    } else {
      const category = {
        ...categoryData,
      }
      const projectCreated = await db.getRepository(Category).save(category)

      return projectCreated
    }
  })
