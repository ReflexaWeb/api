import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class addActiveFieldToGroups1655310848476 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('groups',
      new TableColumn(
        {
          name: 'active',
          type: 'boolean',
          isNullable: true
        }
      )
    )
    await queryRunner.query('UPDATE `groups` SET active = 1;')
    await queryRunner.query('ALTER TABLE `groups` MODIFY COLUMN active tinyint(1) NOT NULL;')
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `groups` DROP COLUMN active')
  }
}
