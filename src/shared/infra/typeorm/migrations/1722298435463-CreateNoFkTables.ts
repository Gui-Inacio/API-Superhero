import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNoFkTables1722298435463 implements MigrationInterface {
  name = 'CreateNoFkTables1722298435463';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "race" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "race" character varying NOT NULL, CONSTRAINT "PK_a3068b184130d87a20e516045bb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "publisher" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "publisher_name" character varying NOT NULL, CONSTRAINT "PK_70a5936b43177f76161724da3e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "attribute" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "attribute_name" character varying NOT NULL, CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de729" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "superpower" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "power_name" character varying NOT NULL, CONSTRAINT "PK_fa3edbd7a16307c13bba08b1b0a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "colour" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "colour" character varying NOT NULL, CONSTRAINT "PK_04e2f7f25e4de91d3b0ec96443d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "gender" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "gender" character varying NOT NULL, CONSTRAINT "PK_98a711129bc073e6312d08364e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "alignment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "alignment" character varying NOT NULL, CONSTRAINT "PK_6d3449aed4bfee0b1d4b9b62e20" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "alignment"`);
    await queryRunner.query(`DROP TABLE "gender"`);
    await queryRunner.query(`DROP TABLE "colour"`);
    await queryRunner.query(`DROP TABLE "superpower"`);
    await queryRunner.query(`DROP TABLE "attribute"`);
    await queryRunner.query(`DROP TABLE "publisher"`);
    await queryRunner.query(`DROP TABLE "race"`);
  }
}
