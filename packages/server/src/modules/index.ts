import { router } from '../trpc'

import user from './users'

export const appRouter = router({
  user,
})

export type AppRouter = typeof appRouter
