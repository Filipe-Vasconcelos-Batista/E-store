import { z } from 'zod'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { validates } from '../utils/validation'
import Order from './order'
import Product from './product'

@Entity()
export default class OrderItem {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('integer')
  orderId: number

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn()
  order: Order

  @Column('integer')
  productId: number

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product

  @Column('integer', { default: 0 })
  quantity: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

export type OrderItemBare = Omit<OrderItem, 'order' | 'product'>

export const orderItemSchema = validates<OrderItemBare>().with({
  id: z.number().int().positive(),
  orderId: z.number().int().positive(),
  productId: z.number().int().positive(),
  quantity: z.number().int().min(0),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const orderItemInsertSchema = orderItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type OrderItemInsert = z.infer<typeof orderItemInsertSchema>
