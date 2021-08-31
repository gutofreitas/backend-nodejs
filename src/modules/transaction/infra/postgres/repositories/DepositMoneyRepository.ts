import IDepositMoneyRepository from '@modules/transaction/repositories/IDepositMoneyRepository';
import { getRepository, Repository } from 'typeorm';
import Transaction from '@modules/transaction/infra/postgres/models/Transaction';
import AppError from '@shared/errors/AppError';
import IDepositMoneyDataDTO from '@modules/transaction/dtos/IDepositMoneyDataDTO';

class DepositMoneyRepository implements IDepositMoneyRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async create(transactionData: IDepositMoneyDataDTO): Promise<Transaction|undefined>{
    const transaction = this.ormRepository.create(transactionData);

    await this.ormRepository.save(transaction);
    
    return transaction;
  }
}

export default DepositMoneyRepository;
