import { authContext } from '@tests/utils/context'
import { fakeUserBuyer, fakeCartItem } from '@server/entities/tests/fakes'
import creator from '@tests/utils/create100Products'
import { createTestDatabase } from '@tests/utils/database'
import { Cart, User } from '@server/entities'
import productRouter from '..'

describe('check that the findAll works', async () => {
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUserBuyer())
  const finalProducts = await creator(db)
  await db.getRepository(Cart).save({
    userId: user.id,
  })
  const { addToCart } = productRouter.createCaller(authContext({ db }, user))
  it('should add the product to the user Cart', async () => {
    const found = await addToCart(
      fakeCartItem({ productId: finalProducts[51].id, quantity: 10 })
    )
    expect(found).toBeDefined()
  })
})
