import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeIdToUuid1729121533462 implements MigrationInterface {
  name = 'ChangeIdToUuid1729121533462';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" DROP CONSTRAINT "FK_744de04e162ee8c08feb9fe7c98"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attribute" DROP CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de729"`,
    );
    await queryRunner.query(`ALTER TABLE "attribute" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "attribute" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "attribute" ADD CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de729" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" DROP CONSTRAINT "FK_2846749d45c0060a466232f4323"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" DROP CONSTRAINT "PK_695e9101d6bfd86621ee2fa3353"`,
    );
    await queryRunner.query(`ALTER TABLE "hero_attribute" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD CONSTRAINT "PK_695e9101d6bfd86621ee2fa3353" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" DROP COLUMN "superhero_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD "superhero_id" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" DROP COLUMN "attribute_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD "attribute_id" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_power" DROP CONSTRAINT "FK_774707c77f2858ed67c7af247ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "PK_b92ff773465116c2b5e215bb910"`,
    );
    await queryRunner.query(`ALTER TABLE "superhero" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "PK_b92ff773465116c2b5e215bb910" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_power" DROP CONSTRAINT "PK_33513c2b7ec49ea8c3d63d8a163"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_power" ADD CONSTRAINT "PK_1df29ffd85077771b740901ff43" PRIMARY KEY ("power_id")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_774707c77f2858ed67c7af247a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_power" DROP COLUMN "superhero_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_power" ADD "superhero_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_power" DROP CONSTRAINT "PK_1df29ffd85077771b740901ff43"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_power" ADD CONSTRAINT "PK_33513c2b7ec49ea8c3d63d8a163" PRIMARY KEY ("power_id", "superhero_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_774707c77f2858ed67c7af247a" ON "hero_power" ("superhero_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD CONSTRAINT "FK_2846749d45c0060a466232f4323" FOREIGN KEY ("superhero_id") REFERENCES "superhero"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD CONSTRAINT "FK_744de04e162ee8c08feb9fe7c98" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_power" ADD CONSTRAINT "FK_774707c77f2858ed67c7af247ac" FOREIGN KEY ("superhero_id") REFERENCES "superhero"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hero_power" DROP CONSTRAINT "FK_774707c77f2858ed67c7af247ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" DROP CONSTRAINT "FK_744de04e162ee8c08feb9fe7c98"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" DROP CONSTRAINT "FK_2846749d45c0060a466232f4323"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_774707c77f2858ed67c7af247a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_power" DROP CONSTRAINT "PK_33513c2b7ec49ea8c3d63d8a163"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_power" ADD CONSTRAINT "PK_1df29ffd85077771b740901ff43" PRIMARY KEY ("power_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_power" DROP COLUMN "superhero_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_power" ADD "superhero_id" character varying(36) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_774707c77f2858ed67c7af247a" ON "hero_power" ("superhero_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_power" DROP CONSTRAINT "PK_1df29ffd85077771b740901ff43"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_power" ADD CONSTRAINT "PK_33513c2b7ec49ea8c3d63d8a163" PRIMARY KEY ("superhero_id", "power_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" DROP CONSTRAINT "PK_b92ff773465116c2b5e215bb910"`,
    );
    await queryRunner.query(`ALTER TABLE "superhero" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD "id" character varying(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "superhero" ADD CONSTRAINT "PK_b92ff773465116c2b5e215bb910" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_power" ADD CONSTRAINT "FK_774707c77f2858ed67c7af247ac" FOREIGN KEY ("superhero_id") REFERENCES "superhero"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" DROP COLUMN "attribute_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD "attribute_id" character varying(36)`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" DROP COLUMN "superhero_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD "superhero_id" character varying(36)`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" DROP CONSTRAINT "PK_695e9101d6bfd86621ee2fa3353"`,
    );
    await queryRunner.query(`ALTER TABLE "hero_attribute" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD "id" character varying(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD CONSTRAINT "PK_695e9101d6bfd86621ee2fa3353" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD CONSTRAINT "FK_2846749d45c0060a466232f4323" FOREIGN KEY ("superhero_id") REFERENCES "superhero"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "attribute" DROP CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de729"`,
    );
    await queryRunner.query(`ALTER TABLE "attribute" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "attribute" ADD "id" character varying(36) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "attribute" ADD CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de729" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "hero_attribute" ADD CONSTRAINT "FK_744de04e162ee8c08feb9fe7c98" FOREIGN KEY ("attribute_id") REFERENCES "attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
