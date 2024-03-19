import { authContext } from '@tests/utils/context'
import {
  fakeProduct,
  fakeUserAdmin,
  fakeCategory,
} from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { Product, User, Category } from '@server/entities'
import imageRouter from '..'

it('should create a persisted project', async () => {
  // ARRANGE
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUserAdmin())
  const category = await db.getRepository(Category).save(fakeCategory())
  const product = await db
    .getRepository(Product)
    .save(fakeProduct({ categoryId: category.id }))
  const { insert } = imageRouter.createCaller(authContext({ db }, user))

  // ACT
  const image = await insert([
    {
      link: 'http://www.This_is_a_link.com',
      productId: product.id,
      isThumbnail: true,
    },
    {
      productId: product.id,
      link: 'http://www.This_is_a_link2.com',
      isThumbnail: false,
    },
    {
      isThumbnail: false,
      link: 'http://www.This_is_a_link2.com',
      productId: product.id,
    },
  ])

  // ASSERT
  expect(image).toMatchObject([
    {
      productId: product.id,
      link: 'http://www.This_is_a_link2.com',
      isThumbnail: false,
    },
    {
      isThumbnail: false,
      link: 'http://www.This_is_a_link2.com',
      productId: product.id,
    },
  ])
})
