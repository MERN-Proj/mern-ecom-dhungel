import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { authCheck } from '../middlewares';
import { createOrUpdateUser } from '../controllers/auth.controller';

const authRoutes = Router();

authRoutes.route('/create-or-update-user').post(expressAsyncHandler(authCheck), expressAsyncHandler(createOrUpdateUser));

export { authRoutes };
