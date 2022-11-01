import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import IAccountRepository from '@modules/account/repositories/IAccountRepository';
import AppError from '@shared/errors/AppError';
import Account from '../infra/postgres/models/Account';

@injectable()
class GetAccountByIdService {
  constructor(
    @inject('AccountRepository')
    private AccountRepository: IAccountRepository,
  ) {}

  public async execute(accountId: number ): Promise<Account> {
      const account = await this.AccountRepository.findById(accountId);

      if(!account || account === undefined) {
        throw new AppError("Conta não encontrada", 204);
      }
      
      return account;
  }
}

export default GetAccountByIdService;