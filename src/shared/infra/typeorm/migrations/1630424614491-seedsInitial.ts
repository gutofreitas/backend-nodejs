import {MigrationInterface, QueryRunner} from "typeorm";

export class seedsInitial1630424614491 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "public".account_types(id, description) VALUES (1, 'Conta corrente'),(2, 'Conta polpança');`);
        await queryRunner.query(`INSERT INTO "public".transaction_types (id, description) VALUES (1, 'Deposito'), (2, 'Saque'), (3, 'Taxa de saque');`);
        await queryRunner.query(`INSERT INTO "public".accounts(id, "name", "accountTypeId", balance, "created_at", "updated_at") VALUES(1, 'Fulano', 1, 0, '2021-08-31 08:16:42.733', '2021-08-31 15:18:21.035');`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE TABLE "public".accounts;`);
        await queryRunner.query(`TRUNCATE TABLE "public".account_types;`);
        await queryRunner.query(`TRUNCATE TABLE "public".transaction_types;`);
    }

}
