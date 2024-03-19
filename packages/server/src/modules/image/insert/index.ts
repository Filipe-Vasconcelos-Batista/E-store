import Image, { imagesInsertArray } from '@server/entities/images'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'

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
      const images = imagesData.filter(
        (imageData) => imageData.isThumbnail !== true
      )
      const imagesCreated = await Promise.all(
        images.map((image) => db.getRepository(Image).save(image))
      )
      return imagesCreated
    }
  })
