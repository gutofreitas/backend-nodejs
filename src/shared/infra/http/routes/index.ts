import { Router } from 'express';

const routes = Router();

routes.use('/', async (req, res) => {
  res.json({ success: "server online"});
});

export default routes;
