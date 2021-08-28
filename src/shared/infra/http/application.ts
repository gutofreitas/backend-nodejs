import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';

import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';
import rateLimiter from './middlewares/rateLimiter';

import '@shared/infra/typeorm';
const application = express();

process.env.TZ = "America/Sao_Paulo";

application.use(express.json());

application.use(rateLimiter);

application.use(routes);

application.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });

});

application.set('port', process.env.APP_PORT || 3000)

export { application }


