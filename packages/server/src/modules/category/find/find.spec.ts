import { authContext } from '@tests/utils/context'
import { Category, User } from '@server/entities'
import { fakeCategory, fakeUserBuyer } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import router from '..'

it('should return a list of categories', async () => {
  const db = await createTestDatabase()

  const [user] = await db.getRepository(User).save([fakeUserBuyer()])

  await db
    .getRepository(Category)
    .save([
      fakeCategory({ title: 'instagram' }),
      fakeCategory({ title: 'Bible' }),
    ])

  const { find } = router.createCaller(authContext({ db }, user))

  const categories = await find()

  expect(categories).toHaveLength(2)
})
