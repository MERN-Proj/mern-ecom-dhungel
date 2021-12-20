import { BaseException } from './BaseException';
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';

export class InvalidMongodbIDException extends BaseException {
  constructor(id: string) {
    super('CastError', StatusCodes.BAD_REQUEST, `"${id}" is not a valid MongoDB ID!`);
  }
}
