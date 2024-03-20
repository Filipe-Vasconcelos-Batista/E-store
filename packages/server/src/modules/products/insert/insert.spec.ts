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

  const productCreated = await create({
    title: 'Banana Bread',
    description: 'A great banana bread',
    price: 12,
    discount: 0,
    stock: 30,
    categoryId: category.id,
    brand: 'calvin klein',
    code: 'ada1012',
  })

  expect(productCreated).toMatchObject({
    id: expect.any(Number),
    title: 'Banana Bread',
    description: 'A great banana bread',
    price: 12,
    discount: 0,
    stock: 30,
    categoryId: category.id,
    brand: 'calvin klein',
    code: 'ada1012',
  })
})
