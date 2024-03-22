import { authContext } from '@tests/utils/context'
import { fakeUserAdmin } from '@server/entities/tests/fakes'
import creator from '@tests/utils/create100Products'
import { createTestDatabase } from '@tests/utils/database'
import { User } from '@server/entities'
import productRouter from '..'

describe('check that the findAll works', async () => {
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUserAdmin())
  const products = await creator(db)
  const { findAll } = productRouter.createCaller(authContext({ db }, user))
  it('should find 100 products in the database if called withouth limit and etc', async () => {
    const found = await findAll({})
    expect(found.length).toBe(100)
  })
  it('should find 20 products in the database if called with limit 20 ', async () => {
    const found = await findAll({ limit: 20 })
    expect(found.length).toBe(20)
  })
  it('should find 20 products in the database if called with limit 20 and offset 10 ', async () => {
    const found = await findAll({ limit: 20, offset: 10 })

    const expectedProducts = products.slice(10, 30)

    expect(found[0].brand).toEqual(expectedProducts[0].brand)
    expect(found[19].brand).toEqual(expectedProducts[19].brand)
  })
})
