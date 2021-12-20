import { BaseException } from './BaseException';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export class InValidEndPointException extends BaseException {
  constructor(message: string) {
    super(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND, message);
  }
}
