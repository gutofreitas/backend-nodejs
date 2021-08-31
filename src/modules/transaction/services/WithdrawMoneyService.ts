import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import IWithdrawMoneyRepository from '@modules/transaction/repositories/IWithdrawMoneyRepository';

import ITransactionDTO from '@modules/transaction/dtos/ITransactionDTO';
import IAccountRepository from '@modules/account/repositories/IAccountRepository';
import AppError from '@shared/errors/AppError';

interface IRequestWithdrawMoneyDTO {
  accountId: number;
  value: number;
}

@injectable()
class WithdrawMoneyService {
  constructor(
    @inject('WithdrawMoneyRepository')
    private withdrawMoneyRepository: IWithdrawMoneyRepository,

    @inject('AccountRepository')
    private accountRepository: IAccountRepository,
  ) {}

  public async execute({
    accountId,
    value,
  }: IRequestWithdrawMoneyDTO): Promise<ITransactionDTO> {
    
    const account = await this.accountRepository.findById(accountId);

    if(!account || account===undefined){
      throw new AppError("Conta inválida!", 400);
    }

    if(value > 600.00) {
      throw new AppError("Valor do saque maior que o limite permitido!", 400);
    }

    const valueWithdraw = value + 0.30;

    if(valueWithdraw > account.balance) {
      throw new AppError("Saldo insuficiente!", 400);
    }

    const transaction = await this.withdrawMoneyRepository.create({
      accountId, 
      transactionTypeId: 2,
      value, 
    });
    
    await this.withdrawMoneyRepository.create({
      accountId, 
      transactionTypeId: 3,
      value: 0.30, 
    });

    if(!transaction || transaction===undefined){
      throw new AppError("Falha ao realizar o saque!", 400);
    }

    account.balance -= valueWithdraw;
    
    this.accountRepository.save(account);

    return transaction;
  }
}

export default WithdrawMoneyService;