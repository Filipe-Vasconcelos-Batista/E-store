import { router } from '@server/trpc'
import insert from './insert'
import thumbnail from './thumbnail'
// import retrieve from './SignUp'

export default router({
  insert,
  thumbnail,
})
