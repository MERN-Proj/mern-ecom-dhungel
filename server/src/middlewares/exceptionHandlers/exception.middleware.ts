import { NextFunction, Request, Response } from 'express';
import { BaseException, InValidEndPointException } from '../../lib';
import { ReasonPhrases } from 'http-status-codes';

export const exceptionMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode: number;
  let status: string;

  console.log(res.status);

  if (err instanceof BaseException) {
    statusCode = err.statusCode;
    status = err.status.toUpperCase();
  } else {
    statusCode = res.statusCode || 500;
    status = ReasonPhrases.INTERNAL_SERVER_ERROR.toUpperCase();
  }

  res.status(statusCode).json({
    success: false,
    status,
    statusCode,
    data: {
      message: err?.message,
      stack: process.env.NODE_ENV === 'production' ? null : err?.stack,
    },
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new InValidEndPointException(`Invalid Endpoint - ${req.originalUrl} Not Found!`);
  next(error);
};
