// import dotenv from 'dotenv';
// dotenv.config();
require('dotenv').config();
import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { dbConnect } from './config';
import { exceptionMiddleware, notFound } from './middlewares';
import { authRoutes } from './route';

const server = async (app: Application) => {
  const port = process.env.SERVER_PORT || 5000;

  dbConnect()
    .then(() => {
      console.log('Database Connected...');
    })
    .catch(e => {
      throw new Error(`Server Not connected.. ${e}`);
    });

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan('tiny' + ''));

  // Routes
  app.use('/api', authRoutes);

  // app.get('/*', exceptionMiddleware);

  // exception middleware
  app.use(notFound);
  app.use(exceptionMiddleware);

  // start the Express server
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
};

server(express());
