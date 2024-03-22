import {
  fakeCategory,
  fakeProduct,
  fakeUserBuyer,
} from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { Category, Product, User } from '@server/entities'
import createOrder from './createOrder'
import findTotal from './findTotal'
import findOrderItemPrice from './findOrderItemPrice'

const db = await createTestDatabase()
const user = await db.getRepository(User).save(fakeUserBuyer())
const category = await db.getRepository(Category).save(fakeCategory())
const products = Array.from({ length: 100 }, () =>
  fakeProduct({ categoryId: category.id })
)
const finalProducts = await Promise.all(
  products.map((product) => db.getRepository(Product).save(product))
)
const items = finalProducts.map((product) => ({
  productId: product.id,
  quantity: product.stock,
}))

describe('findOrderItemPrice', async () => {
  it('should discover the value of every item in an array', async () => {
    const prices = await findOrderItemPrice(items, db)
    expect(prices).toHaveLength(items.length)
    expect(prices[0].price).toEqual(finalProducts[0].price * prices[0].quantity)
    expect(prices[99].price).toEqual(
      finalProducts[99].price * prices[99].quantity
    )
  })
})
describe('findTotal', async () => {
  it('should discover the value of every item in an array', async () => {
    const prices = await findOrderItemPrice(items, db)
    const total = await findTotal(prices)

    expect(total).toBeDefined()
  })
})
describe('findTotal', async () => {
  it('should discover the value of every item in an array', async () => {
    const prices = await findOrderItemPrice(items, db)
    const total = await findTotal(prices)
    const order = await createOrder(user.id, total, db)
    expect(order).toBeDefined()
    expect(order).toMatchObject({
      userId: user.id,
      total,
      status: 'waiting',
      id: order.id,
    })
  })
})
