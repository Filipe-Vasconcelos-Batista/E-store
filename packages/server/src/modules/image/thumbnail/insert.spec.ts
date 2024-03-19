import { authContext } from '@tests/utils/context'
import {
  fakeProduct,
  fakeUserAdmin,
  fakeCategory,
} from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { Product, User, Category } from '@server/entities'
import imageRouter from '..'

const db = await createTestDatabase()
const user = await db.getRepository(User).save(fakeUserAdmin())
const category = await db.getRepository(Category).save(fakeCategory())
const product = await db
  .getRepository(Product)
  .save(fakeProduct({ categoryId: category.id }))
it('should create a thumbnail image', async () => {
  const { thumbnail } = imageRouter.createCaller(authContext({ db }, user))

  const image = await thumbnail([
    {
      link: 'http://www.This_is_a_link.com',
      productId: product.id,
      isThumbnail: true,
    },
  ])

  expect(image).toMatchObject([
    {
      productId: product.id,
      link: 'http://www.This_is_a_link.com',
      isThumbnail: true,
    },
  ])
})
