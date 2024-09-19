import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterAlignmentTableName1726701778734
  implements MigrationInterface
{
  name = 'AlterAlignmentTableName1726701778734';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "alligment" RENAME TO "alignment"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "alignment" RENAME TO "alligment"`);
  }
}
