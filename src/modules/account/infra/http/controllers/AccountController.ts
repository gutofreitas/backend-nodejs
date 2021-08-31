import { Request, Response } from 'express';

import { container } from 'tsyringe';

import GetAccountByIdService from '@modules/account/services/GetAccountByIdService';

export default class AccountController {
  public async list(
    request: Request,
    response: Response,
  ): Promise<Response> {

    const { id } = request.params;

    const getAccountByIdService = container.resolve(
      GetAccountByIdService,
    );
      
    const account = await getAccountByIdService.execute(Number(id));

    return response.json(account);
  }
}
