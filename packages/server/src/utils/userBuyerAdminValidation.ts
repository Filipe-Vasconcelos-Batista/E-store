import { TRPCError } from '@trpc/server'

export function admin(authorization: string) {
  if (authorization !== 'admin') {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'you do not have the required authorization',
    })
  }
}

export function buyer(authorization: string) {
  if (authorization !== 'buyer') {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'you do not have the required authorization',
    })
  }
}
