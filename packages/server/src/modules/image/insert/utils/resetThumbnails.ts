import { Connection } from 'typeorm/browser'
import { Images } from '@server/entities'
import { ImagesBare } from '@server/entities/images'

export default async function resetThumbnail(
  input: ImagesBare,
  db: Connection
) {
  const reset = {
    id: input.id,
    link: input.link,
    productId: input.productId,
    isThumbnail: false,
  }

  const updatedImage = await db.getRepository(Images).save(reset)

  return updatedImage
}
