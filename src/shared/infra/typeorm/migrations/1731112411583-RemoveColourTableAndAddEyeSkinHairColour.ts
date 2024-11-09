import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveColourTableAndAddEyeSkinHairColour1731112411583
  implements MigrationInterface
{
  name = 'RemoveColourTableAndAddEyeSkinHairColour1731112411583';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_c1589ef6c9afd61dd63c8876f23"`,
    );
    await queryRunner.query(`ALTER TABLE "superhero" DROP COLUMN "colour_id"`);
    await queryRunner.query(`ALTER TABLE "superhero" ADD "eye_colour" uuid`);
    await queryRunner.query(`ALTER TABLE "superhero" ADD "hair_colour" uuid`);
    await queryRunner.query(`ALTER TABLE "superhero" ADD "skin_colour" uuid`);
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_64f3964345d677f8d0a7650d1a6" FOREIGN KEY ("eye_colour") REFERENCES "colour"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_bff411cd7f2e00fba26a90ffb2d" FOREIGN KEY ("hair_colour") REFERENCES "colour"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_0107397e647b1c760a232bdfd9a" FOREIGN KEY ("skin_colour") REFERENCES "colour"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_0107397e647b1c760a232bdfd9a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_bff411cd7f2e00fba26a90ffb2d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_64f3964345d677f8d0a7650d1a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP COLUMN "skin_colour"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP COLUMN "hair_colour"`,
    );
    await queryRunner.query(`ALTER TABLE "superhero" DROP COLUMN "eye_colour"`);
    await queryRunner.query(`ALTER TABLE "superhero" ADD "colour_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_c1589ef6c9afd61dd63c8876f23" FOREIGN KEY ("colour_id") REFERENCES "colour"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
