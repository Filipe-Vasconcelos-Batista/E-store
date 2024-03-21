import { router } from '@server/trpc'
import addToOrder from './addToOrder'
import findOrder from './findOrder'

export default router({
  addToOrder,
  findOrder,
})
