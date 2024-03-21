import { fakeUserBuyer } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { Cart, User } from '@server/entities'
import createCart from './createOrder'
import findCart from './findOrderById'

describe('check that we can create a Cart', async () => {
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUserBuyer())
  it('should create a cart for the user once its called', async () => {
    await createCart(user.id, db)
    const newCart = await db
      .getRepository(Cart)
      .findOne({ where: { userId: user.id } })
    expect(newCart).toEqual({
      cartItems: undefined,
      id: 1,
      user: undefined,
      userId: 1,
    })
  })
})
describe('check we can find the Cart Id', async () => {
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUserBuyer())
  const newCart = await createCart(user.id, db)

  it('should retrieve an id', async () => {
    const cartId = await findCart(user.id, db)

    expect(cartId).toBeDefined()
  })
  it('should retrieve the right id among a lot more carts and users', async () => {
    const user2 = await db.getRepository(User).save(fakeUserBuyer())
    const user3 = await db.getRepository(User).save(fakeUserBuyer())
    const user4 = await db.getRepository(User).save(fakeUserBuyer())
    const user5 = await db.getRepository(User).save(fakeUserBuyer())
    await createCart(user2.id, db)
    await createCart(user3.id, db)
    await createCart(user4.id, db)
    await createCart(user5.id, db)

    const cartId = await findCart(user.id, db)

    expect(cartId).toBe(newCart.id)
  })
})
