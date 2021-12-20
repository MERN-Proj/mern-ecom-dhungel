import { Router, Request, Response } from 'express';

const userRoutes = Router();

userRoutes.get('/user');

export { userRoutes };
