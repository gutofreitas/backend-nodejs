import IWtihdrawMoneyDataDTO from '@modules/transaction/dtos/IWithdrawMoneyDTO';
import ITransactionDTO from '@modules/transaction/dtos/ITransactionDTO';
import Transaction from '@modules/transaction/infra/postgres/models/Transaction';
import AppError from '@shared/errors/AppError';
import IWtihdrawMoneyRepository from '../IWithdrawMoneyRepository';

interface ITransaction {
  id: number
}

class FakeWtihdrawMoneyRepository implements IWtihdrawMoneyRepository {
  private transaction: Transaction;

  public async create(WtihdrawMoneyData: IWtihdrawMoneyDataDTO): Promise<Transaction|undefined>{
    this.transaction = {
      id: 1,
      accountId: WtihdrawMoneyData.accountId,
      value: WtihdrawMoneyData.value,
      transactionTypeId: WtihdrawMoneyData.transactionTypeId,
      createdAt: new Date(),
      updatedAt: new Date(),
      account: {
        id: WtihdrawMoneyData.accountId,
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

    if (WtihdrawMoneyData.value < 1) {
      return undefined;
    }

    return this.transaction;
  }
}

export default FakeWtihdrawMoneyRepository;
