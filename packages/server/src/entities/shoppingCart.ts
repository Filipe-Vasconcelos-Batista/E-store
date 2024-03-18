import { validates } from '../utils/validation'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { z } from 'zod'
import User from './user'
import Product from './product'

@Entity()
export default class Cart {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('integer')
  userId: number

  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn()
  user: User

  @Column('integer')
  productId: number

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product

  @Column('boolean')
  complete: boolean
}

export type CartBare = Omit<Cart, 'user' | 'product'>

export const cartSchema = validates<CartBare>().with({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  productId: z.number().int().positive(),
  complete: z.boolean(),
})

export const cartInsertSchema = cartSchema.omit({ id: true })

export type CartInsert = z.infer<typeof cartInsertSchema>
