import { authContext } from '@tests/utils/context'
import {
  fakeCategory,
  fakeProduct,
  fakeOrderItem,
  fakeUserAdmin,
} from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { Category, Order, OrderItem, Product, User } from '@server/entities'
import productRouter from '..'
import { fakeOrder } from '../../../entities/tests/fakes'

describe('check that the findOrdersAdmin works', async () => {
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUserAdmin())
  const category = await db.getRepository(Category).save(fakeCategory())
  const products = Array.from({ length: 100 }, () =>
    fakeProduct({ categoryId: category.id })
  )
  const every = await Promise.all(
    products.map((product) => db.getRepository(Product).save(product))
  )
  const order = await db
    .getRepository(Order)
    .save(fakeOrder({ id: 1, userId: user.id }))

  await db.getRepository(OrderItem).save(
    fakeOrderItem({
      orderId: order.id,
      productId: every[50].id,
    })
  )
  const { findOrderAdmin } = productRouter.createCaller(
    authContext({ db }, user)
  )
  it('should find the user Cart', async () => {
    const found = await findOrderAdmin()
    expect(found).toBeDefined()
  })
})
