import { Request, Response } from 'express';

import { container } from 'tsyringe';

import DepositMoneyService from '@modules/transaction/services/DepositMoneyService';

export default class DepositMoneyController {
  public async create(
    request: Request,
    response: Response,
  ): Promise<Response> {

    const {accountId, value} = request.body;

    const depositMoneyService = container.resolve(
      DepositMoneyService,
    );

    const deposit = await depositMoneyService.execute({
      accountId,
      value
    });

    return response.status(201).json(deposit);
  }
}
