import { router } from '@server/trpc'
import create from './insert'
import findById from './findById'

export default router({
  create,
  findById,
})
