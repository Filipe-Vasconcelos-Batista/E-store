import Category from '@server/entities/category'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'

export default authenticatedProcedure.query(async ({ ctx: { db } }) => {
  const categoryCreated = await db.getRepository(Category).find()

  return categoryCreated
})
