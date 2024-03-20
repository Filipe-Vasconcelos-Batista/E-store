import { Images } from '@server/entities'
import { Connection } from 'typeorm/browser'

export default async function checkThumbnail(
  productId: number,
  db: Connection
) {
  const imageRepository = db.getRepository(Images)
  const thumbnail = await imageRepository.findOne({
    where: {
      productId,
      isThumbnail: true,
    },
  })
  return thumbnail
}
