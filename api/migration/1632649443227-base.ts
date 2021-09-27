import {MigrationInterface, QueryRunner} from "typeorm";

export class base1632649443227 implements MigrationInterface {
    name = "base1632649443227"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE \"users\" (\"id\" BIGSERIAL NOT NULL, \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now(), \"email\" character varying NOT NULL, \"name\" character varying NOT NULL, \"password\" character varying NOT NULL, \"isActive\" boolean NOT NULL, \"lastLogin\" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT \"UQ_97672ac88f789774dd47f7c8be3\" UNIQUE (\"email\"), CONSTRAINT \"PK_a3ffb1c0c8416b9fc6f907b7433\" PRIMARY KEY (\"id\"))");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE \"users\"");
    }

}
