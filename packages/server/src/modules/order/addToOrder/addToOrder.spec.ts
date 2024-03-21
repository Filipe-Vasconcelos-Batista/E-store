import { authContext } from '@tests/utils/context'
import {
  fakeCategory,
  fakeUserBuyer,
  fakeProduct,
  fakeOrderItem,
} from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { Category, Product, User } from '@server/entities'
import productRouter from '..'

describe('check that we can add Orders', async () => {
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUserBuyer())
  const category = await db.getRepository(Category).save(fakeCategory())
  const products = Array.from({ length: 100 }, () =>
    fakeProduct({ categoryId: category.id })
  )

  const finalProducts = await Promise.all(
    products.map((product) => db.getRepository(Product).save(product))
  )

  const { addToOrder } = productRouter.createCaller(authContext({ db }, user))
  it('should products and create a new Order', async () => {
    const found = await addToOrder([
      fakeOrderItem({ productId: finalProducts[51].id }),
      fakeOrderItem({ productId: finalProducts[11].id }),
    ])
    expect(found).toBeDefined()
  })
})
