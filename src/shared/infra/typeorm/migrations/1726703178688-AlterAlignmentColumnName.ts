import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterAlignmentColumnName1726703178688
  implements MigrationInterface
{
  name = 'AlterAlignmentColumnName1726703178688';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "alignment" RENAME COLUMN "alligment" TO "alignment"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "alignment" RENAME COLUMN "alignment" TO "alligment"`,
    );
  }
}
