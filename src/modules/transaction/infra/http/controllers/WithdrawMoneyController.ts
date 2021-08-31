import { Request, Response } from 'express';

import { container } from 'tsyringe';

import WithdrawMoneyService from '@modules/transaction/services/WithdrawMoneyService';

export default class WithdrawMoneyController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response> {

    const {accountId, value} = request.body;

    const withdrawMoneyService = container.resolve(
      WithdrawMoneyService,
    );

    const withdraw = await withdrawMoneyService.execute({
      accountId,
      value
    });

    return response.json(withdraw);
  }
}
