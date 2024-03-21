import { validates } from '@server/utils/validation'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { z } from 'zod'
import Cart from './cart'
import Product from './product'

@Entity()
export default class CartItem {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('integer')
  cartId: number

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn()
  cart: Cart

  @Column('integer')
  productId: number

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product

  @Column('integer', { default: 0 })
  quantity: number

  @Column('boolean')
  complete: boolean
}

export type CartItemBare = Omit<CartItem, 'cart' | 'product'>

export const cartItemSchema = validates<CartItemBare>().with({
  id: z.number().int().positive(),
  cartId: z.number().int().positive(),
  productId: z.number().int().positive(),
  quantity: z.number().int().min(0),
  complete: z.boolean(),
})

export const cartItemInsertSchema = cartItemSchema.omit({
  id: true,
})

export type CartItemInsert = z.infer<typeof cartItemInsertSchema>
