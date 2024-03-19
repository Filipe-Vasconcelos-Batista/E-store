import { router } from '../trpc'
import product from './products'
import user from './users'

export const appRouter = router({
  user,
  product,
})

export type AppRouter = typeof appRouter
