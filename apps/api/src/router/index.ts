import { router } from '@api/trpc';
import { createUser } from '../procedures/createUser';
import { getUsers } from '@api/procedures/getUsers';
import { registerRouter } from '@api/procedures/auth/registerRouter';
import { authRouter } from '@api/procedures/auth/loginLogoutRouter';

export const appRouter = router({
  auth: {
    loginLogout: authRouter,
    register: registerRouter
  },
  user: {
    create: createUser,
    list: getUsers
  },
});

export type AppRouter = typeof appRouter;
