import { Request, Response, NextFunction } from 'express';
import { User } from '../model';
import { OKResponse } from '../lib';

interface IAuthUserDto {
  email: string;
  picture: string;
  name: string;
}

export const createOrUpdateUser = async (req: Request, res: Response, _next: NextFunction) => {
  const { email, picture, name } = <IAuthUserDto>req.user;

  const user = await User.findOneAndUpdate({ email }, { picture, name }, { new: true, upsert: true }).exec();

  OKResponse(res, user);
};
