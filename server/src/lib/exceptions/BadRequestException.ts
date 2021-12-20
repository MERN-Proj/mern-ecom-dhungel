import { BaseException } from './BaseException';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export class BadRequestException extends BaseException {
  constructor(message: string) {
    super(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST, message);
  }
}
