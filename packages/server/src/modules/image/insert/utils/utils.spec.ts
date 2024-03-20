import {
  fakeCategory,
  fakeImages,
  fakeProduct,
} from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { Category, Images, Product } from '@server/entities'
import checkThumbnail from './checkThumbnails'
import resetThumbnail from './resetThumbnails'

const db = await createTestDatabase()
const category = await db.getRepository(Category).save(fakeCategory())
const product = await db
  .getRepository(Product)
  .save(fakeProduct({ categoryId: category.id }))
const image = await db
  .getRepository(Images)
  .save(fakeImages({ productId: product.id, isThumbnail: true }))
describe('checking the utils', async () => {
  it('checkThumbnail should return an object if there is already a thumbnail in the table', async () => {
    const checked = await checkThumbnail(product.id, db)

    // should return the image created above
    expect(checked).toMatchObject(image)
  })
  it('resetThumbnail should turn the isThumbnail:true to false', async () => {
    const checked = await checkThumbnail(product.id, db)
    if (checked) {
      const reseted = await resetThumbnail(checked, db)

      // should return the image created above
      expect(reseted).toMatchObject({
        ...checked,
        isThumbnail: false,
      })
    }
  })
})
