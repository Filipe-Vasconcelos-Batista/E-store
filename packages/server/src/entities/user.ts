import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { z } from 'zod'
import { validates } from '../utils/validation'
import Cart from './cart'
import Order from './order'

@Entity()
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('text', { unique: true })
  email: string

  @Column('text', { unique: true })
  username: string

  @Column('text')
  password: string

  @Column('text')
  authorization: string

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[]

  @OneToMany(() => Order, (order) => order.user)
  order: Order[]
}

export type UserBare = Omit<User, 'carts' | 'order'>

export const userSchema = validates<UserBare>().with({
  id: z.number().int().positive(),
  email: z.string().trim().toLowerCase().email(),
  username: z.string(),
  password: z.string().min(8).max(64),
  authorization: z.enum(['buyer', 'admin']),
})

export const userInsertSchema = userSchema.omit({ id: true })

export type UserInsert = z.infer<typeof userInsertSchema>
export type AuthUser = Pick<User, 'id' | 'authorization'>

export const authUserSchema = validates<AuthUser>().with({
  id: z.number().int().positive(),
  authorization: z.string(),
})
