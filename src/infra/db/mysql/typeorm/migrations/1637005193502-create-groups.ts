import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createGroups1637005193502 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: 'groups',
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
    await queryRunner.dropTable('groups')
  }
}
