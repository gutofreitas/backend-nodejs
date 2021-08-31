import IWithdrawMoneyDataDTO from '@modules/transaction/dtos/IWithdrawMoneyDTO';
import IWithdrawMoneyRepository from '@modules/transaction/repositories/IWithdrawMoneyRepository';
import AppError from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';
import Transaction from '../models/Transaction';

class WithdrawMoneyRepository implements IWithdrawMoneyRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async create(transactionData: IWithdrawMoneyDataDTO): Promise<Transaction|undefined>{
    const transaction = this.ormRepository.create(transactionData);

    await this.ormRepository.save(transaction);
    
    return transaction;
  }
}

export default WithdrawMoneyRepository;
