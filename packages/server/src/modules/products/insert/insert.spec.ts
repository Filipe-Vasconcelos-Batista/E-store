import { authContext } from '@tests/utils/context'
import { fakeUserAdmin } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { User } from '@server/entities'
import productRouter from '..'

it('should create a persisted project', async () => {
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUserAdmin())
  const { create } = productRouter.createCaller(authContext({ db }, user))

  // ACT
  const productCreated = await create({
    name: 'banana Bread',
    description: 'A great banana bread',
    price: 12,
    discount: 0,
    stock: 30,
    brand: 'calvin klein',
  })

  // ASSERT
  expect(productCreated).toMatchObject({
    id: expect.any(Number),
    name: 'Banana Bread',
    userId: user.id,
  })
})
