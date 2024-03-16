import { validates } from '../../utils/validation'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { z } from 'zod'
import Product from './product'

@Entity()
export default class Images {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('integer')
  productId: number

  @ManyToOne(() => Product, (product) => product.images)
  @JoinColumn()
  product: Product

  @Column('text')
  link: string
}

export type ImagesBare = Omit<Images, 'product'>

export const imagesSchema = validates<ImagesBare>().with({
  id: z.number().int().positive(),
  productId: z.number().int().positive(),
  link: z.string().url(),
})

export const imagesInsertSchema = imagesSchema.omit({ id: true })

export type ImagesInsert = z.infer<typeof imagesInsertSchema>
