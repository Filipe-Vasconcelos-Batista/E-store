import { router } from '@server/trpc'
import create from './insert'
import findById from './findById'
import findAll from './findAll'
import findByName from './findByName'

export default router({
  create,
  findById,
  findAll,
  findByName,
})
