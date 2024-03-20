import { router } from '../trpc'
import product from './products'
import user from './users'
import cart from './cart'
import image from './image'

export const appRouter = router({
  user,
  product,
  image,
  cart,
})

export type AppRouter = typeof appRouter
