import { Entity, Column, PrimaryGeneratedColumn, OneToOne,  JoinColumn, OneToMany } from 'typeorm';
import Transaction from './Transaction';

@Entity('transaction_types')
export default class TransactionTypes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    description: string;

    @OneToMany(type => Transaction, transaction => transaction.transactionType) transactions: Transaction[];  
}