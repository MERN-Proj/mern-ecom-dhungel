import { BaseException } from './BaseException';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export class NotFoundException extends BaseException {
  message: string
  constructor(id: string) {
    super(ReasonPhrases.NOT_FOUND, StatusCodes.NOT_FOUND, `Document with ${id} Not Found!`);
  }
}
