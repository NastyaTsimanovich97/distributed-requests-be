import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRequestTable1739610966741 implements MigrationInterface {
    name = 'CreateRequestTable1739610966741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "url" character varying NOT NULL, "status" integer NOT NULL DEFAULT '0', "http_code" integer, CONSTRAINT "UQ_7f077b37862f7404b3c33dd5765" UNIQUE ("url"), CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "request"`);
    }

}
