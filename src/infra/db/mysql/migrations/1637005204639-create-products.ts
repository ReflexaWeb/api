import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createProducts1637005204639 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: 'products',
          columns: [
            {
              name: 'id',
              type: 'numeric',
              isPrimary: true
            },
            {
              name: 'name',
              type: 'varchar'
            },
            {
              name: 'code',
              type: 'varchar',
              isUnique: true
            },
            {
              name: 'reference',
              type: 'varchar'
            },
            {
              name: 'unity',
              type: 'varchar'
            },
            {
              name: 'fraction',
              type: 'varchar',
              default: null,
              isNullable: true
            },
            {
              name: 'product_url',
              type: 'varchar'
            },
            {
              name: 'active',
              type: 'boolean',
              default: true
            },
            {
              name: 'group_code',
              type: 'varchar',
              isNullable: false
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()'
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              isNullable: true,
              default: null
            }
          ]
        }
      )
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products')
  }
}
