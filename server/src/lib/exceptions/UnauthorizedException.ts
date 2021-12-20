import { BaseException } from './BaseException';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export class UnauthorizedException extends BaseException {
  constructor(message: string) {
    super(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED, message);
  }
}
