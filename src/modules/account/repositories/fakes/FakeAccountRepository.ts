import IAccountRepository from '@modules/account/repositories/IAccountRepository';
import Account from '@modules/account/infra/postgres/models/Account';

class FakeAccountRepository implements IAccountRepository {
  private account: Account;

  constructor(){
    this.account = {
      id: 1,
      name: 'teste',
      accountTypeId: 1,
      balance: 100, 
      createdAt: new Date(), 
      updatedAt: new Date(), 
      accountType: {
        id: 1,
        description: "conta corrente"
      },
      transactions: []
    };
  }
  

  public async findById(id: number): Promise<Account | undefined>{
    const account = (id===1) ?
      this.account
      : undefined ;

    return account;
  }

  public async save(account: Account): Promise<Account> {
    this.account = account;
    return this.account
  }
}

export default FakeAccountRepository;
