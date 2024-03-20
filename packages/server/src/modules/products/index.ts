import { router } from '@server/trpc'
import create from './insert'
import findById from './findById'
import findAll from './findAll'

export default router({
  create,
  findById,
  findAll,
})
