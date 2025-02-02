import { Router } from 'express';

import AccountController from '../controllers/AccountController';

const accountRouter = Router();
const accountController = new AccountController();

accountRouter.get('/:id', accountController.list);

export default accountRouter;