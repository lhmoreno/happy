import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class users1603280456591 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
          isNullable: false
        },
        {
          name: 'password',
          type: 'varchar',
          isNullable: false
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
