import Image, { imagesInsertArray } from '@server/entities/images'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'
import checkThumb from './utils/checkThumbnails'
import reset from './utils/resetThumbnails'

export default authenticatedProcedure
  .input(imagesInsertArray)
  .mutation(async ({ input: imagesData, ctx: { authUser, db } }) => {
    if (authUser.authorization !== 'admin') {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'you do not have the required authorization',
      })
    } else {
      const hasThumbnail = imagesData.filter(
        (imageData) => imageData.isThumbnail === true
      )
      if (hasThumbnail.length > 1) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Too many thumbnail images, select just one',
        })
      } else {
        const def = await checkThumb(hasThumbnail[0].productId, db)
        if (def) {
        }
      }

      const images = imagesData.filter(
        (imageData) => imageData.isThumbnail !== true
      )
      const imagesCreated = await Promise.all(
        images.map((image) => db.getRepository(Image).save(image))
      )
      return imagesCreated
    }
  })
