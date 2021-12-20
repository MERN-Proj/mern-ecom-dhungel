import { Request, Response, NextFunction } from 'express';
import { admin } from '../config';
import { UnauthorizedException } from '../lib';

export const authCheck = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authtoken) {
    throw new UnauthorizedException('Token not found');
  }

  const firebaseUser = await admin.auth().verifyIdToken(<string>req.headers.authtoken);

  if (!firebaseUser) {
    throw new UnauthorizedException('Token is invalid or expired');
  }

  req.user = firebaseUser;

  next();
};
