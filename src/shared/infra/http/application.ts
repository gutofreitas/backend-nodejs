import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from "swagger-ui-express";
import cors from 'cors';
import "express-async-errors";

import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';
import '@shared/container';
import '@shared/infra/typeorm';

import rateLimiter from './middlewares/rateLimiter';
import { swaggerFile } from "../swagger";

const application = express();

process.env.TZ = "America/Sao_Paulo";

application.use(express.json());
application.use(cors());

application.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerFile));

application.use(rateLimiter);

application.use(routes);

application.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.log(err);
  
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });

});

application.set('port', process.env.APP_PORT || 3000)

export { application }
