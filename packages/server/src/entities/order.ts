import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm'
import { z } from 'zod'
import { validates } from '../utils/validation'
import User from './user'
import OrderItem from './orderItems'

export enum OrderStatus {
  Waiting = 'waiting',
  InTransit = 'in transit',
  Delivered = 'delivered',
}

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

  @Column('enum', { enum: OrderStatus })
  status: OrderStatus

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export type OrderBare = Omit<Order, 'user' | 'orderItems'>

export const orderSchema = validates<OrderBare>().with({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  total: z.number(),
  status: z.nativeEnum(OrderStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const orderInsertSchema = orderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type OrderInsert = z.infer<typeof orderInsertSchema>
