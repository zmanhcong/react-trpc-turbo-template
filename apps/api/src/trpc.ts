import { initTRPC, TRPCError, type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';

import type { AppRouter } from '@api/router';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import superjson from 'superjson';
import jwt from 'jsonwebtoken';

export interface Context {
  req: CreateExpressContextOptions['req'];
  res: CreateExpressContextOptions['res'];
  userId: string | null; 
}



export function createContext({ req, res}: CreateExpressContextOptions): Context {
  let userId: string | null = null;
  const token = req.cookies?.token;
  if(token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
      userId = payload.userId
    } catch(error){
      userId = null;
    }
  }

  return {
    req, res, userId
  }
}


const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ ctx, next }) => {
  if(!ctx.userId) {
    throw new TRPCError({code: 'UNAUTHORIZED', message: 'Not authenticated.' });
  }
  return next({
    ctx: {
      userId: ctx.userId
    }
  })
})

export const protectedProcedure = publicProcedure.use(isAuthed);

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
