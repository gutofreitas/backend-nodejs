import { container } from 'tsyringe';

import IDepositMoneyRepository from '@modules/transaction/repositories/IDepositMoneyRepository';
import DepositMoneyRepository from '@modules/transaction/infra/postgres/repositories/DepositMoneyRepository';

import IWithdrawMoneyRepository from '@modules/transaction/repositories/IWithdrawMoneyRepository';
import WithdrawMoneyRepository from '@modules/transaction/infra/postgres/repositories/WithdrawMoneyRepository';

import IAccountRepository from '@modules/account/repositories/IAccountRepository';
import AccountRepository from '@modules/account/infra/postgres/repositories/AccountRepository';

container.registerSingleton<IDepositMoneyRepository>(
  'DepositMoneyRepository',
  DepositMoneyRepository,
);

container.registerSingleton<IWithdrawMoneyRepository>(
  'WithdrawMoneyRepository',
  WithdrawMoneyRepository,
);

container.registerSingleton<IAccountRepository>(
  'AccountRepository',
  AccountRepository,
);
