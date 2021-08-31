import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAccountTypes1630326033639 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "account_types",
                columns: [
                {
                    name: "id",
                    type: "int4",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "description",
                    type: "varchar(200)"
                }]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("account_types");
    }

}
