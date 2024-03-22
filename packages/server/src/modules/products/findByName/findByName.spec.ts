import { authContext } from '@tests/utils/context'
import { fakeUserAdmin } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { User } from '@server/entities'
import creator from '@tests/utils/create100Products'
import productRouter from '..'

describe('check that the findAll works', async () => {
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUserAdmin())
  const products = await creator(db)
  const { findByName } = productRouter.createCaller(authContext({ db }, user))
  it('should find the specific searched for product', async () => {
    const searched = products[30].title.split(' ')[0]
    const found = await findByName(searched)
    expect(found[0].title).toEqual(products[30].title)
  })
  it('should start returning in brands if the title have no match', async () => {
    const searched = products[55].brand.substring(0, 5)
    const found = await findByName(searched)
    expect(found[0].brand || found[1].brand || found[2].brand).toEqual(
      products[55].brand
    )
  })
})
