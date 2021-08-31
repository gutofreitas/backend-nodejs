import { Entity, Column, PrimaryGeneratedColumn, OneToOne,  JoinColumn } from 'typeorm';

@Entity('account_types')
export default class AccountTypes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;
}