import { CartItemInsert } from '@server/entities/cartItem'
import Category from '@server/entities/category'
import { ImagesInsert } from '@server/entities/images'
import { OrderInsert } from '@server/entities/order'
import { ProductInsert } from '@server/entities/product'
import { UserInsert } from '@server/entities/user'
import { CartInsert } from '@server/entities/cart'
import { random } from '@tests/utils/random'

const randomId = () => random.integer({ min: 1, max: 2147483647 })

export const fakeCartItem = <T extends Partial<CartItemInsert>>(
  overrides: T = {} as T
) => ({
  cartId: randomId(),
  productId: randomId(),
  quantity: random.integer({ min: 1, max: 10 }),
  ...overrides,
})

export const fakeCategory = <T extends Partial<Category>>(
  overrides: T = {} as T
) => ({
  id: randomId(),
  title: random.word(),
  ...overrides,
})

export const fakeImages = <T extends Partial<ImagesInsert>>(
  overrides: T = {} as T
) => ({
  productId: randomId(),
  link: random.url(),
  ...overrides,
})

export const fakeOrder = <T extends Partial<OrderInsert>>(
  overrides: T = {} as T
) => ({
  userId: randomId(),
  total: random.floating({ min: 0, max: 1000 }),
  delivered: false,
  ...overrides,
})

export const fakeProduct = <T extends Partial<ProductInsert>>(
  overrides: T = {} as T
) => ({
  title: random.sentence(),
  description: random.paragraph(),
  price: random.floating({ min: 0, max: 1000 }),
  discount: random.floating({ min: 0, max: 100 }),
  stock: random.integer({ min: 0, max: 100 }),
  brand: random.sentence(),
  categoryId: randomId(),
  code: random.guid(),
  ...overrides,
})

export const fakeUserBuyer = <T extends Partial<UserInsert>>(
  overrides: T = {} as T
) => ({
  id: randomId(),
  email: random.email(),
  username: random.string(),
  password: random.guid(),
  authorization: 'buyer',
  ...overrides,
})
export const fakeUserAdmin = <T extends Partial<UserInsert>>(
  overrides: T = {} as T
) => ({
  id: randomId(),
  email: random.email(),
  username: random.string(),
  password: random.guid(),
  authorization: 'admin',
  ...overrides,
})
export const fakeCart = <T extends Partial<CartInsert>>(
  overrides: T = {} as T
) => ({
  userId: randomId(),
  complete: false,
  ...overrides,
})
