import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterAttributeValueColumn1737500972632
  implements MigrationInterface
{
  name = 'AlterAttributeValueColumn1737500972632';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" DROP COLUMN "attribute_value"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD "attribute_value" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" DROP COLUMN "attribute_value"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD "attribute_value" character varying NOT NULL`,
    );
  }
}
