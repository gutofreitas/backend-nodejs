import IDepositMoneyDataDTO from '@modules/transaction/dtos/IDepositMoneyDataDTO';
import ITransactionDTO from '@modules/transaction/dtos/ITransactionDTO';
import Transaction from '@modules/transaction/infra/postgres/models/Transaction';
import AppError from '@shared/errors/AppError';
import IDepositMoneyRepository from '../IDepositMoneyRepository';

interface ITransaction {
  id: number
}

class FakeDepositMoneyRepository implements IDepositMoneyRepository {
  private transaction: Transaction;

  public async create(depositMoneyData: IDepositMoneyDataDTO): Promise<Transaction|undefined>{
    this.transaction = {
      id: 1,
      accountId: depositMoneyData.accountId,
      value: depositMoneyData.value,
      transactionTypeId: depositMoneyData.transactionTypeId,
      createdAt: new Date(),
      updatedAt: new Date(),
      account: {
        id: depositMoneyData.accountId,
        name: 'fulano',
        balance: 10.00,
        accountTypeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        accountType: {
          id: 1,
          description: 'Conta corrente'
        },
        transactions: [new Transaction()]
      },
      transactionType: {
        id: 1,
        description: 'teste',
        transactions: [new Transaction()],
      }
    }

    if (depositMoneyData.value < 1) {
      return undefined;
    }

    return this.transaction;
  }
}

export default FakeDepositMoneyRepository;
