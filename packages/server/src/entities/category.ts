import { validates } from '../../utils/validation'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { z } from 'zod'
import Product from './product'

@Entity()
export default class Category {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('text')
  title: string

  @OneToMany(() => Product, (product) => product.category)
  products: Product[]
}

export type CategoryBare = Omit<Category, 'products'>

export const categorySchema = validates<CategoryBare>().with({
  id: z.number().int().positive(),
  title: z.string(),
})

export const categoryInsertSchema = categorySchema.omit({ id: true })

export type CategoryInsert = z.infer<typeof categoryInsertSchema>
