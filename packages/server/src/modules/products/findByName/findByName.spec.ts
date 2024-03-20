import { authContext } from '@tests/utils/context'
import {
  fakeCategory,
  fakeUserAdmin,
  fakeProduct,
} from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { Category, Product, User } from '@server/entities'
import productRouter from '..'

describe('check that the findAll works', async () => {
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUserAdmin())
  const category = await db.getRepository(Category).save(fakeCategory())
  const products = Array.from({ length: 100 }, () =>
    fakeProduct({ categoryId: category.id })
  )
  await Promise.all(
    products.map((product) => db.getRepository(Product).save(product))
  )
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
