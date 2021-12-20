import { Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export const OKResponse = (res: Response, data: Object | Array<Object>) => {
  return res.json({
    status: ReasonPhrases.OK.toUpperCase(),
    statusCode: StatusCodes.OK,
    data,
  });
};

export const CreatedResponse = (res: Response, data: Object | Array<Object>) => {
  return res.json({
    status: ReasonPhrases.CREATED.toUpperCase(),
    statusCode: StatusCodes.CREATED,
    data,
  });
};
