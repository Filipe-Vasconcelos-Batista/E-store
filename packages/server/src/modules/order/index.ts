import { router } from '@server/trpc'
import addToOrder from './addToOrder'
import findOrderAdmin from './findOrderAdmin'

export default router({
  addToOrder,
  findOrderAdmin,
})
