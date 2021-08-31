import { Router } from 'express';

import DepositMoneyController from '../controllers/DepositMoneyController';
import WithdrawMoneyController from '../controllers/WithdrawMoneyController';

const transactionRouter = Router();
const depositMoneyController = new DepositMoneyController();
const withdrawMoneyController = new WithdrawMoneyController();

transactionRouter.post('/deposit', depositMoneyController.create);
transactionRouter.post('/withdraw', withdrawMoneyController.create);

export default transactionRouter;