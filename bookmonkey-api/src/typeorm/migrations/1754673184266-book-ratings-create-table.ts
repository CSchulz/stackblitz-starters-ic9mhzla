import { MigrationInterface, QueryRunner } from "typeorm";
import { BookRatingEntity } from '../../book-ratings/entity/book-rating.entity';

export class BookRatingsCreateTable1754673184266 implements MigrationInterface {
    name = 'BookRatingsCreateTable1754673184266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book-ratings" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "rating" smallint NOT NULL, "bookId" integer, CONSTRAINT "PK_d21d688ff7c47445f6e59d677f7" PRIMARY KEY ("id"))`);

        await this.migrateRatings(queryRunner);

        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "book-ratings" ADD CONSTRAINT "FK_622e932bc23e64f2d6ecafcddd0" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book-ratings" DROP CONSTRAINT "FK_622e932bc23e64f2d6ecafcddd0"`);
        await queryRunner.query(`ALTER TABLE "books" ADD "rating" real NOT NULL`);
        await queryRunner.query(`DROP TABLE "book-ratings"`);
    }

    private async migrateRatings(queryRunner: QueryRunner) {
        const ratings: Array<{id: number, rating: number}> = await queryRunner.query(`SELECT "id", "rating" FROM "books"`);
        const bookRatings = ratings.map(({id, rating}) => {
            return {
                rating,
                book: { id },
            };
        });
        const repository = queryRunner.manager.getRepository(BookRatingEntity)
        await repository.save(bookRatings);
    }
}
