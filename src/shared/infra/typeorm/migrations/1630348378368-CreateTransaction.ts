import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTransaction1630348378368 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "transactions",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "accountId",
                    type: "int"
                },
                {
                    name: "transactionTypeId",
                    type: "int"
                },
                {
                    name: "value",
                    type: "float"
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }), true);

        await queryRunner.createForeignKey("transactions", new TableForeignKey({
            columnNames: ["accountId"],
            referencedColumnNames: ["id"],
            referencedTableName: "accounts",
        }));
        await queryRunner.createForeignKey("transactions", new TableForeignKey({
            columnNames: ["transactionTypeId"],
            referencedColumnNames: ["id"],
            referencedTableName: "transaction_types",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("transactions");
        if(table instanceof Table) {
            const foreignKeyAccount = table.foreignKeys.find(fk => fk.columnNames.indexOf("accountId") !== -1);
            if(foreignKeyAccount instanceof TableForeignKey) {
                await queryRunner.dropForeignKey("transactions", foreignKeyAccount);
            }
            const foreignKeyTransactionType = table.foreignKeys.find(fk => fk.columnNames.indexOf("transactionTypeId") !== -1);
            if(foreignKeyTransactionType instanceof TableForeignKey) {
                await queryRunner.dropForeignKey("transactions", foreignKeyTransactionType);
            }
        }
        await queryRunner.dropTable("transactions");
    }

}
