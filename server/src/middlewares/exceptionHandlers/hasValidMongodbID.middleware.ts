import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { InvalidMongodbIDException } from '../../lib';

export const hasValidID = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req?.params;

  if (!Types.ObjectId.isValid(id)) {
    throw new InvalidMongodbIDException(id);
  }

  next();
};
