import { router } from '@server/trpc'
import addToCart from './addToCart'
import findCart from './findCart'
import deleteFromCart from './deleteFromCart'

export default router({
  addToCart,
  findCart,
  deleteFromCart,
})
