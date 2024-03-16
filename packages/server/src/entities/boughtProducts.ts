import { validates } from '../../utils/validation'
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
export default class BoughtProducts {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('integer')
  userId: number

  @ManyToOne(() => User, (user) => user.boughtProducts)
  @JoinColumn()
  user: User

  @Column('integer')
  productId: number

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product

  @Column('timestamp with time zone')
  dateOfPurchase: Date

  @Column('boolean')
  delivered: boolean
}

export type BoughtProductsBare = Omit<BoughtProducts, 'user' | 'product'>

export const boughtProductsSchema = validates<BoughtProductsBare>().with({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  productId: z.number().int().positive(),
  dateOfPurchase: z.date(),
  delivered: z.boolean(),
})

export const boughtProductsInsertSchema = boughtProductsSchema.omit({
  id: true,
})

export type BoughtProductsInsert = z.infer<typeof boughtProductsInsertSchema>
