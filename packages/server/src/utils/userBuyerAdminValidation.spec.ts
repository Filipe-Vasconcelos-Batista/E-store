import { User } from '@server/entities'
import { fakeUserAdmin, fakeUserBuyer } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import * as auth from './userBuyerAdminValidation'

describe('if fed a admin user to the buyer validation it will throw an error', async () => {
  const db = await createTestDatabase()
  const buyer = await db.getRepository(User).save(fakeUserBuyer())
  const admin = await db.getRepository(User).save(fakeUserAdmin())

  it('admin only accepts admin', () => {
    expect(() => auth.admin(buyer.authorization)).toThrow(
      'you do not have the required authorization'
    )
    expect(() => auth.admin(admin.authorization)).not.toThrow(
      'you do not have the required authorization'
    )
  })
  it('buyer only accepts buyer', () => {
    expect(() => auth.buyer(admin.authorization)).toThrow(
      'you do not have the required authorization'
    )
    expect(() => auth.buyer(buyer.authorization)).not.toThrow(
      'you do not have the required authorization'
    )
  })
})
