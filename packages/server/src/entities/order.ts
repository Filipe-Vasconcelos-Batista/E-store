import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm'
import { z } from 'zod'
import { validates } from '../utils/validation'
import User from './user'
import OrderItem from './orderItems'

@Entity()
export default class Order {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('integer')
  userId: number

  @ManyToOne(() => User, (user) => user.order)
  @JoinColumn()
  user: User

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[]

  @Column('decimal')
  total: number

  @Column('boolean')
  delivered: boolean
}

export type OrderBare = Omit<Order, 'user' | 'orderItems'>

export const orderSchema = validates<OrderBare>().with({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  total: z.number(),
  delivered: z.boolean(),
})

export const orderInsertSchema = orderSchema.omit({
  id: true,
})

export type OrderInsert = z.infer<typeof orderInsertSchema>
