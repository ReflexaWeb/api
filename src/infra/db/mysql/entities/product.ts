import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('products')
export class ProductMySQL {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  code!: string

  @Column({ default: null })
  reference?: string

  @Column({ default: null })
  unity?: string

  @Column({ default: null })
  fraction?: string

  @Column({ default: null })
  product_url?: string

  @Column({ default: null })
  unity_reference?: string

  @Column({ default: null })
  fraction_reference?: string

  @Column()
  active: boolean

  @Column()
  group_code!: string

  @Column({ default: () => 'now()' })
  created_at: Date

  @Column({ nullable: true })
  updated_at?: Date

  constructor () {
    this.created_at = new Date()
    this.active = true
  }
}
