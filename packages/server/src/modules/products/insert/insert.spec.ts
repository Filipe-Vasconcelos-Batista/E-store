/*
import { authContext } from '@tests/utils/context'
import { fakeCategory, fakeUserAdmin } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { Category, User } from '@server/entities'
import productRouter from '..'

it('should create a product', async () => {
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUserAdmin())
  const category = await db.getRepository(Category).save(fakeCategory())
  const { create } = productRouter.createCaller(authContext({ db }, user))

  // ACT
  const productCreated = await create({
    name: 'Banana Bread',
    description: 'A great banana bread',
    price: 12,
    discount: 0,
    stock: 30,
    category: category.id,
    brand: 'calvin klein',
    sku: 'ada1012',
  })

  // ASSERT
  expect(productCreated).toMatchObject({
    id: expect.any(Number),
    name: 'Banana Bread',
    userId: user.id,
    price: 12,
    discount: 0,
    stock: 30,
    category: category.id,
    brand: 'calvin klein',
    sku: 'ada1012',
  })
})
*/
