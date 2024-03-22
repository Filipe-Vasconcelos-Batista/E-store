import { authContext } from '@tests/utils/context'
import { fakeUserBuyer, fakeCartItem } from '@server/entities/tests/fakes'
import creator from '@tests/utils/create100Products'
import { createTestDatabase } from '@tests/utils/database'
import { Cart, CartItem, User } from '@server/entities'
import productRouter from '..'

describe('check that the findAll works', async () => {
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUserBuyer())
  const every = await creator(db)
  const cart = await db.getRepository(Cart).save({
    userId: user.id,
  })

  await db.getRepository(CartItem).save(
    fakeCartItem({
      cartId: cart.id,
      productId: every[50].id,
      complete: false,
    })
  )
  const { findCart } = productRouter.createCaller(authContext({ db }, user))
  it('should find the user Cart', async () => {
    const found = await findCart()
    expect(found).toBeDefined()
  })
  it('should find only the user items that are not completed ', async () => {
    await db.getRepository(CartItem).save(
      fakeCartItem({
        cartId: cart.id,
        productId: every[51].id,
        complete: true,
      })
    )
    await db.getRepository(CartItem).save(
      fakeCartItem({
        cartId: cart.id,
        productId: every[52].id,
        complete: false,
      })
    )
    const found = await findCart()
    expect(found?.cartItems).toHaveLength(2)
  })
  it('should find only the user items eveb when more users carts are added ', async () => {
    const user2 = await db.getRepository(User).save(fakeUserBuyer())
    const cart2 = await db.getRepository(Cart).save({
      userId: user2.id,
    })

    await db.getRepository(CartItem).save(
      fakeCartItem({
        cartId: cart2.id,
        productId: every[51].id,
        complete: false,
      })
    )
    await db.getRepository(CartItem).save(
      fakeCartItem({
        cartId: cart2.id,
        productId: every[52].id,
        complete: false,
      })
    )
    const found = await findCart()
    expect(found?.cartItems).toHaveLength(2)
  })
})
