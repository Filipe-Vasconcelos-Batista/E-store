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
import Category from './category'
import Images from './images'

@Entity()
export default class Product {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('text')
  title: string

  @Column('text')
  description: string

  @Column('float')
  price: number

  @Column('float')
  discount: number

  @Column('integer')
  stock: number

  @Column('text')
  brand: string

  @Column('integer')
  categoryId: number

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn()
  category: Category

  @OneToMany(() => Images, (images) => images.productId)
  images: Images[]

  @Column('text')
  code: string
}

export type ProductBare = Omit<Product, 'category' | 'images'>

export const productSchema = validates<ProductBare>().with({
  id: z.number().int().positive(),
  title: z.string(),
  description: z.string(),
  price: z.number().nonnegative(),
  discount: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  brand: z.string(),
  categoryId: z.number().int().positive(),
  code: z.string().nonempty(),
})

export const productInsertSchema = productSchema.omit({ id: true })

export type ProductInsert = z.infer<typeof productInsertSchema>
