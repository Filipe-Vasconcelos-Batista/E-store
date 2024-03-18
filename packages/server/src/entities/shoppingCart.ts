import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { z } from 'zod'
import { validates } from '../utils/validation'
import User from './user'
import CartItem from './cartItem' // Assuming you have this entity defined

@Entity()
export default class Cart {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('integer')
  userId: number

  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn()
  user: User

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[]

  @Column('boolean')
  complete: boolean
}

export type CartBare = Omit<Cart, 'user' | 'cartItems'>

export const cartSchema = validates<CartBare>().with({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  complete: z.boolean(),
})

export const cartInsertSchema = cartSchema.omit({
  id: true,
})

export type CartInsert = z.infer<typeof cartInsertSchema>
