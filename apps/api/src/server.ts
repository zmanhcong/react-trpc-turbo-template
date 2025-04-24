import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { createContext } from './trpc';
import cookieParser from 'cookie-parser';

import { appRouter } from '@api/router';


async function main() {
  const port = process.env.PORT || 3000;
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  const app = express();

  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));

  app.use(cookieParser());


  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );


  // For testing purposes, wait-on requests '/'
  app.get('/', (req, res) => res.send('Server is running!'));

  app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
}

void main();
