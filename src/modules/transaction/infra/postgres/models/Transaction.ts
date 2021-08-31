import { Entity, Column, PrimaryGeneratedColumn, OneToOne,  JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

import Account from "../../../../account/infra/postgres/models/Account";
import TransactionTypes from "./TransactionTypes";

@Entity('transactions')
export default class Transaction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accountId: number;
    
    @Column()
    transactionTypeId: number;

    @Column({ nullable: false, type: "float", default: 0.0 })
    value: number;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => Account, account => account.transactions) account: Account;
    
    @ManyToOne(type => TransactionTypes, transactionType => transactionType.transactions) transactionType: TransactionTypes;
}
