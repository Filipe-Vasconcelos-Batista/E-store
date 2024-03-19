import { authContext } from '@tests/utils/context'
import { Category, User } from '@server/entities'
import { fakeCategory, fakeUserAdmin } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import router from '..'

it('should return a list of projects', async () => {
  const db = await createTestDatabase()

  // a pair of users and projects to make sure we do not return other users' projects
  const [user, userOther] = await db
    .getRepository(User)
    .save([fakeUserAdmin(), fakeUserAdmin()])

  await db
    .getRepository(Category)
    .save([
      fakeCategory({ title: 'instagram' }),
      fakeCategory({ title: 'Bible' }),
    ])

  const { find } = router.createCaller(authContext({ db }, user))

  // When (ACT)
  const userCategory = await find()

  // Then (ASSERT)
  expect(userCategory).toHaveLength(1)
  expect(userCategory[0]).toMatchObject({
    id: expect.any(Number),
    userId: user.id,

    // no relations
    user: undefined,
    bugs: undefined,
  })
})
