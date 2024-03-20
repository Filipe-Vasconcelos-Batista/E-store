import { authContext } from '@tests/utils/context'
import {
  fakeCategory,
  fakeUserAdmin,
  fakeProduct,
} from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { Category, Product, User } from '@server/entities'
import productRouter from '..'

describe('check that the find by id works', async () => {
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUserAdmin())
  const category = await db.getRepository(Category).save(fakeCategory())
  const product1 = await db.getRepository(Product).save(
    fakeProduct({
      categoryId: category.id,
    })
  )
  const { findById } = productRouter.createCaller(authContext({ db }, user))
  it('should create a product', async () => {
    const found = await findById(product1.id)

    expect(found).toMatchObject(product1)
  })
})
