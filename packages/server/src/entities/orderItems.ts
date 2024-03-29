import { z } from 'zod'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { validates } from '../utils/validation'
import Order from './order'
import Product from './product'

export enum OrderItemStatus {
  Sold = 'sold',
  Returned = 'returned',
}
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

  @Column('integer', { default: 1 })
  quantity: number

  @Column('enum', { enum: OrderItemStatus })
  status: OrderItemStatus
}

export type OrderItemBare = Omit<OrderItem, 'order' | 'product'>

export const orderItemSchema = validates<OrderItemBare>().with({
  id: z.number().int().positive(),
  orderId: z.number().int().positive(),
  productId: z.number().int().positive(),
  quantity: z.number().int().min(0),
  status: z.nativeEnum(OrderItemStatus),
})

export const orderItemInsertSchema = orderItemSchema.omit({
  id: true,
})
export const orderItemArraySchema = z.array(orderItemInsertSchema)

export type OrderItemInsert = z.infer<typeof orderItemInsertSchema>
