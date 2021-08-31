import { Router } from 'express';

import transactionRouter from '@modules/transaction/infra/http/routes/transaction.routes';
import accountRouter from '@modules/account/infra/http/routes/account.routes';

const routes = Router();

routes.use('/transaction', transactionRouter);
routes.use('/account', accountRouter);


export default routes;
