import { MigrationInterface, QueryRunner } from "typeorm";

export class BookCreateTable1754672985932 implements MigrationInterface {
    name = 'BookCreateTable1754672985932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "isbn" character varying(20) NOT NULL, "authors" text NOT NULL, "price" real NOT NULL, "amount" real NOT NULL, "thumbnail" text, "rating" real NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "books"`);
    }

}
