import Image, { imagesInsertArray } from '@server/entities/images'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { admin } from '@server/utils/userBuyerAdminValidation'
import { TRPCError } from '@trpc/server'
import resetThumbnail from './utils/resetThumbnails'
import checkThumbnail from './utils/checkThumbnails'

export default authenticatedProcedure
  .input(imagesInsertArray)
  .mutation(async ({ input: imagesData, ctx: { authUser, db } }) => {
    admin(authUser.authorization)
    const hasThumbnail = imagesData.filter(
      (imageData) => imageData.isThumbnail === true
    )
    if (hasThumbnail) {
      if (hasThumbnail.length !== 1) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'too many thumbnail selections',
        })
      }
      const oldThumbnail = await checkThumbnail(hasThumbnail[0].productId, db)
      if (oldThumbnail) {
        resetThumbnail(oldThumbnail, db)
      }
    }

    const imagesCreated = db.getRepository(Image).save(imagesData)
    return imagesCreated
  })
