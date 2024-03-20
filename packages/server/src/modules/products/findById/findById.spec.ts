import { authContext } from '@tests/utils/context'
import {
  fakeCategory,
  fakeUserAdmin,
  fakeProduct,
  fakeImages,
} from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { Category, Images, Product, User } from '@server/entities'
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
  await db.getRepository(Product).save(
    fakeProduct({
      categoryId: category.id,
    })
  )
  const { findById } = productRouter.createCaller(authContext({ db }, user))
  it('should find a product throug the id', async () => {
    const found = await findById(product1.id)
    expect(found).toMatchObject(product1)
  })
  it('should return the images related to that product', async () => {
    await db
      .getRepository(Images)
      .save(fakeImages({ productId: product1.id, isThumbnail: true }))
    await db
      .getRepository(Images)
      .save(fakeImages({ productId: product1.id, isThumbnail: false }))
    await db
      .getRepository(Images)
      .save(fakeImages({ productId: product1.id, isThumbnail: false }))
    await db
      .getRepository(Images)
      .save(fakeImages({ productId: product1.id, isThumbnail: false }))
    const found = await findById(product1.id)
    expect(found?.images).toHaveLength(4)
  })
})
