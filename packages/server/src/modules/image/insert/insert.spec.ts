import { authContext } from '@tests/utils/context'
import {
  fakeImages,
  fakeProduct,
  fakeUserAdmin,
  fakeCategory,
} from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { Product, User, Category, Images } from '@server/entities'
import imageRouter from '..'

it('should create a group of images', async () => {
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUserAdmin())
  const category = await db.getRepository(Category).save(fakeCategory())
  const product = await db
    .getRepository(Product)
    .save(fakeProduct({ categoryId: category.id }))
  const { insert } = imageRouter.createCaller(authContext({ db }, user))

  const insertion = await insert([
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

  expect(insertion).toMatchObject([
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
})

it('should change the thumbnail to false in an existing thumbnail if a new thumbnail is added', async () => {
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUserAdmin())
  const category = await db.getRepository(Category).save(fakeCategory())
  const product = await db
    .getRepository(Product)
    .save(fakeProduct({ categoryId: category.id }))
  const image = await db
    .getRepository(Images)
    .save(fakeImages({ productId: product.id, isThumbnail: true }))

  const { insert } = imageRouter.createCaller(authContext({ db }, user))

  await insert([
    {
      link: 'http://www.This_is_a_link.com',
      productId: product.id,
      isThumbnail: true,
    },
  ])
  const thumbnail = await db.getRepository(Images).find()
  expect(thumbnail).toMatchObject([
    {
      id: 2,
      productId: 1,
      isThumbnail: true,
      link: 'http://www.This_is_a_link.com',
    },
    {
      id: image.id,
      productId: image.productId,
      isThumbnail: false,
      link: image.link,
    },
  ])
})

it('should only accept one thumbnail as true', async () => {
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUserAdmin())
  const category = await db.getRepository(Category).save(fakeCategory())
  const product = await db
    .getRepository(Product)
    .save(fakeProduct({ categoryId: category.id }))

  const { insert } = imageRouter.createCaller(authContext({ db }, user))

  await expect(
    insert([
      {
        link: 'http://www.This_is_a_link.com',
        productId: product.id,
        isThumbnail: true,
      },
      {
        link: 'http://www.This_is_another_link.com',
        productId: product.id,
        isThumbnail: true,
      },
    ])
  ).rejects.toThrow(/thumbnail/i) // throws out some error complaining about "email"
})
