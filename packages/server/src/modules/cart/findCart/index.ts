import Cart from '@server/entities/cart'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'

export default authenticatedProcedure.query(
  async ({ ctx: { authUser, db } }) => {
    const productFound = await db
      .getRepository(Cart)
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.cartItems', 'cartItem')
      .leftJoinAndSelect('cartItem.product', 'product')
      .leftJoinAndSelect('product.images', 'image')
      .where('cart.userId = :userId', { userId: authUser.id })
      .andWhere('cartItem.complete = :complete', { complete: false })
      .getOne()

    return productFound
  }
)
