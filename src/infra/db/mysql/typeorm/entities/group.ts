import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('groups')
export class GroupMySQL {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  code!: string

  @Column({ default: () => 'now()' })
  created_at: Date

  @Column({ nullable: true })
  updated_at?: Date

  @Column()
  active!: boolean

  constructor () {
    this.created_at = new Date()
  }
}
