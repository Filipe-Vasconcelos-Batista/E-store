import { authContext } from '@tests/utils/context'
import { fakeUserAdmin } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { User } from '@server/entities'
import productRouter from '..'

it('should create a persisted Category', async () => {
  const db = await createTestDatabase()
  const user = await db.getRepository(User).save(fakeUserAdmin())
  const { create } = productRouter.createCaller(authContext({ db }, user))

  const categoryCreated = await create({
    title: 'razors',
  })

  expect(categoryCreated).toMatchObject({
    id: expect.any(Number),
    title: 'razors',
  })
})
