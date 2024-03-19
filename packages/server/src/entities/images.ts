import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { z } from 'zod'
import { validates } from '../utils/validation'
import Product from './product'

@Entity()
export default class Images {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('integer')
  productId: number

  @Column('boolean')
  isThumbnail: boolean

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
  isThumbnail: z.boolean(),
})

export const imagesInsertSchema = imagesSchema.omit({ id: true })
export const imagesInsertArray = z.array(imagesInsertSchema)

export type ImagesInsert = z.infer<typeof imagesInsertSchema>
