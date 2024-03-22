import Category, { categoryInsertSchema } from '@server/entities/category'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { admin } from '@server/utils/userBuyerAdminValidation'

export default authenticatedProcedure
  .input(categoryInsertSchema)
  .mutation(async ({ input: categoryData, ctx: { authUser, db } }) => {
    admin(authUser.authorization)

    const category = {
      ...categoryData,
    }
    const projectCreated = await db.getRepository(Category).save(category)

    return projectCreated
  })
