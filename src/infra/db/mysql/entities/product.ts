import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('products')
export class ProductMySQL {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  code!: string

  @Column()
  unity!: string

  @Column({ default: null })
  fraction?: string

  @Column()
  product_url!: string

  @Column({ default: () => 'now()' })
  created_at: Date

  @Column({ nullable: true })
  updated_at?: Date

  constructor () {
    this.created_at = new Date()
  }
}
