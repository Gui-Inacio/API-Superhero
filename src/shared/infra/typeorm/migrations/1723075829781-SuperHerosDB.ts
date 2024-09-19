import { MigrationInterface, QueryRunner } from 'typeorm';

export class SuperHerosDB1723075829781 implements MigrationInterface {
  name = 'SuperHerosDB1723075829781';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "superpower" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "power_name" character varying NOT NULL, CONSTRAINT "PK_fa3edbd7a16307c13bba08b1b0a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "gender" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "gender" character varying NOT NULL, CONSTRAINT "PK_98a711129bc073e6312d08364e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "colour" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "colour" character varying NOT NULL, CONSTRAINT "PK_04e2f7f25e4de91d3b0ec96443d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "race" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "race" character varying NOT NULL, CONSTRAINT "PK_a3068b184130d87a20e516045bb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "publisher" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "publisher" character varying NOT NULL, CONSTRAINT "PK_70a5936b43177f76161724da3e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "alligment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "alligment" character varying NOT NULL, CONSTRAINT "PK_fe5eba298f3cbd3ced343b1a040" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "attribute" ("id" character varying(36) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "attribute_name" character varying NOT NULL, CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de729" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hero_attribute" ("id" character varying(36) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "attribute_value" character varying NOT NULL, "superhero_id" character varying(36), "attribute_id" character varying(36), CONSTRAINT "PK_695e9101d6bfd86621ee2fa3353" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "superhero" ("id" character varying(36) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "superhero_name" character varying NOT NULL, "full_name" character varying NOT NULL, "gender_id" uuid, "colour_id" uuid, "race_id" uuid, "publisher_id" uuid, "alligment_id" uuid, CONSTRAINT "PK_b92ff773465116c2b5e215bb910" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "hero_power" ("superhero_id" character varying(36) NOT NULL, "power_id" uuid NOT NULL, CONSTRAINT "PK_33513c2b7ec49ea8c3d63d8a163" PRIMARY KEY ("superhero_id", "power_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_774707c77f2858ed67c7af247a" ON "hero_power" ("superhero_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1df29ffd85077771b740901ff4" ON "hero_power" ("power_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD CONSTRAINT "FK_2846749d45c0060a466232f4323" FOREIGN KEY ("superhero_id") REFERENCES "superhero"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD CONSTRAINT "FK_744de04e162ee8c08feb9fe7c98" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_a0c86f7e12906eb64001a15ecb4" FOREIGN KEY ("gender_id") REFERENCES "gender"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_c1589ef6c9afd61dd63c8876f23" FOREIGN KEY ("colour_id") REFERENCES "colour"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_3531077b53b3a81bb9c497bf038" FOREIGN KEY ("race_id") REFERENCES "race"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_7e0c912655b9221b48f3bac91cd" FOREIGN KEY ("publisher_id") REFERENCES "publisher"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "FK_a79332449f50fad2037d3125001" FOREIGN KEY ("alligment_id") REFERENCES "alligment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_power" ADD CONSTRAINT "FK_774707c77f2858ed67c7af247ac" FOREIGN KEY ("superhero_id") REFERENCES "superhero"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_power" ADD CONSTRAINT "FK_1df29ffd85077771b740901ff43" FOREIGN KEY ("power_id") REFERENCES "superpower"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hero_power" DROP CONSTRAINT "FK_1df29ffd85077771b740901ff43"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_power" DROP CONSTRAINT "FK_774707c77f2858ed67c7af247ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_a79332449f50fad2037d3125001"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_7e0c912655b9221b48f3bac91cd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_3531077b53b3a81bb9c497bf038"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_c1589ef6c9afd61dd63c8876f23"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "FK_a0c86f7e12906eb64001a15ecb4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" DROP CONSTRAINT "FK_744de04e162ee8c08feb9fe7c98"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" DROP CONSTRAINT "FK_2846749d45c0060a466232f4323"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1df29ffd85077771b740901ff4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_774707c77f2858ed67c7af247a"`,
    );
    await queryRunner.query(`DROP TABLE "hero_power"`);
    await queryRunner.query(`DROP TABLE "superhero"`);
    await queryRunner.query(`DROP TABLE "hero_attribute"`);
    await queryRunner.query(`DROP TABLE "attribute"`);
    await queryRunner.query(`DROP TABLE "alligment"`);
    await queryRunner.query(`DROP TABLE "publisher"`);
    await queryRunner.query(`DROP TABLE "race"`);
    await queryRunner.query(`DROP TABLE "colour"`);
    await queryRunner.query(`DROP TABLE "gender"`);
    await queryRunner.query(`DROP TABLE "superpower"`);
  }
}
