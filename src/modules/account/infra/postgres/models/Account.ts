import { Entity, Column, PrimaryGeneratedColumn, OneToOne,  JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import Transaction from '../../../../transaction/infra/postgres/models/Transaction';
import AccountTypes from "./AccountTypes";

@Entity('accounts')
export default class Account {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    accountTypeId: number;

    @Column({ nullable: false, type: "float", default: 0.0 })
    balance: number;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(type => AccountTypes)
    @JoinColumn({ name: "accountTypeId" })
    accountType: AccountTypes;

    @OneToMany(type => Transaction, transaction => transaction.account) transactions: Transaction[];  
}