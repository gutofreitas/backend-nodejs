import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import IDepositMoneyRepository from '@modules/transaction/repositories/IDepositMoneyRepository';
import ITransactionDTO from '@modules/transaction/dtos/ITransactionDTO';
import IAccountRepository from '@modules/account/repositories/IAccountRepository';

import AppError from '@shared/errors/AppError';

interface IRequestDepositMoneyDTO {
  accountId: number;
  value: number;
}

@injectable()
class DepositMoneyService {
  constructor(
    @inject('DepositMoneyRepository')
    private depositMoneyRepository: IDepositMoneyRepository,
    
    @inject('AccountRepository')
    private accountRepository: IAccountRepository,
  ) {}

  public async execute({
    accountId,
    value,
  }: IRequestDepositMoneyDTO): Promise<ITransactionDTO> {
    if(value <= 0){
      throw new AppError("Valor da transação invalido!", 400);
    }

    const account = await this.accountRepository.findById(accountId);

    if(!account || account===undefined){
      throw new AppError("Conta inválida!", 400);
    }

    const transaction = await this.depositMoneyRepository.create({
      accountId, 
      transactionTypeId: 1,
      value, 
    });

    if(!transaction || transaction===undefined){
      throw new AppError("Falha ao realizar o depósito!", 400);
    }

    account.balance += value;
    
    this.accountRepository.save(account);

    return transaction;
  }
}

export default DepositMoneyService;