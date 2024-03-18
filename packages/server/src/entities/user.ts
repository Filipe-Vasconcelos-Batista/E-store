import { validates } from '../utils/validation'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { z } from 'zod'
import Cart from './shoppingCart'
import BoughtProducts from './boughtProducts'

@Entity()
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('text')
  email: string

  @Column('text')
  username: string

  @Column('text')
  passwordHash: string

  @Column('text')
  authorization: string

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[]

  @OneToMany(() => BoughtProducts, (boughtProducts) => boughtProducts.user)
  boughtProducts: BoughtProducts[]
}

export type UserBare = Omit<User, 'carts' | 'boughtProducts'>

export const userSchema = validates<UserBare>().with({
  id: z.number().int().positive(),
  email: z.string().trim().toLowerCase().email(),
  username: z.string(),
  passwordHash: z.string().min(8).max(64),
  authorization: z.enum(['buyer', 'admin']),
})

export const userInsertSchema = userSchema.omit({ id: true })

export type UserInsert = z.infer<typeof userInsertSchema>
export type AuthUser = Pick<User, 'id' | 'authorization'>

export const authUserSchema = validates<AuthUser>().with({
  id: z.number().int().positive(),
  authorization: z.string(),
})
