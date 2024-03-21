import bcrypt from 'bcrypt'
import { publicProcedure } from '@server/trpc'
import { User } from '@server/entities'
import config from '@server/config'
import { userSchema } from '@server/entities/user'
import { TRPCError } from '@trpc/server'
import createCart from '@server/modules/cart/utils/createCart'

export default publicProcedure
  .input(
    userSchema.pick({
      username: true,
      email: true,
      password: true,
    })
  )
  .mutation(async ({ input: { username, email, password }, ctx: { db } }) => {
    const hash = await bcrypt.hash(password, config.auth.passwordCost)

    try {
      const user = await db.getRepository(User).save({
        username,
        email,
        password: hash,
        authorization: 'buyer',
      })
      createCart(user.id, db)
      return {
        id: user.id,
        username: user.username,
        email: user.email,
      }
    } catch (error) {
      if (!(error instanceof Error)) {
        // We would generally add a more pretty message here while
        // passing along the real error as the error cause.
        // Then, at the final error handler we would log the error
        // to the server logs and then strip out the system error
        // cause before sending the pretty/generic error to the client.
        throw error
      }

      if (error.message.includes('duplicate key')) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User with this email/username already exists',
        })
      }

      throw error
    }
  })
