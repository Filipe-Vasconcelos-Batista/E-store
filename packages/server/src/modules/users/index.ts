import { router } from '@server/trpc'
import login from './login'
import signup from './SignUp'

export default router({
  login,
  signup,
})
