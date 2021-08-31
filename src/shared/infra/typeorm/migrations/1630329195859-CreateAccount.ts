import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class CreateAccount1630329195859 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "accounts",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "accountTypeId",
                    type: "int"
                },
                {
                    name: "balance",
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

        await queryRunner.createForeignKey("accounts", new TableForeignKey({
            columnNames: ["accountTypeId"],
            referencedColumnNames: ["id"],
            referencedTableName: "account_types",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("accounts");
        if(table instanceof Table) {
            const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("accountTypeId") !== -1);
            if(foreignKey instanceof TableForeignKey) {
                await queryRunner.dropForeignKey("accounts", foreignKey);
            }
        }
        await queryRunner.dropTable("accounts");
    }

}
