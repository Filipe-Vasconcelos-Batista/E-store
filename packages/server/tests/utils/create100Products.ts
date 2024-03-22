import { Category, Product } from '@server/entities'
import { fakeCategory, fakeProduct } from '@server/entities/tests/fakes'
import { Connection } from 'typeorm/browser'

export default async function creator(db: Connection) {
  const category = await db.getRepository(Category).save(fakeCategory())

  const products = Array.from({ length: 100 }, () =>
    fakeProduct({ categoryId: category.id })
  )

  const finalProducts = await Promise.all(
    products.map((product) => db.getRepository(Product).save(product))
  )
  return finalProducts
}
