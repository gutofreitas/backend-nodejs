import Account from '../infra/postgres/models/Account';

interface IAccountRepository {
  findById(id: number): Promise<Account|undefined>;
  save(account: Account): Promise<Account>;
}

export default IAccountRepository;
