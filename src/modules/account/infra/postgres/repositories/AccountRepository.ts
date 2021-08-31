import IAccountRepository from '@modules/account/repositories/IAccountRepository';
import Account from '@modules/account/infra/postgres/models/Account';
import { getRepository, Repository } from 'typeorm';

class AccountRepository implements IAccountRepository {
  private ormRepository: Repository<Account>;

  constructor() {
    this.ormRepository = getRepository(Account);
  }

  public async findById(id: number): Promise<Account|undefined>{
    const findAccount = await this.ormRepository.findOne(id);

    return findAccount;
  }

  public async save(account: Account): Promise<Account> {
    return this.ormRepository.save(account);
  }
}

export default AccountRepository;
