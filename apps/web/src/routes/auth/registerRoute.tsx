import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../rootRoute'
import RegisterComponent from '@/components/features/auth/register'

// export const registerRouter = createRoute({
//   getParentRoute: () => rootRoute,
//   path: 'register',
// }).lazy(() => import('@/components/features/auth/register/index.lazy').then((d) => d.Route))import RegisterComponent from '@/components/features/auth/register';

export const registerRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: 'register',
  component: RegisterComponent
});


// export const register = createRoute({
//   getParentRoute: () => registerRouter,
//   path: '/',
//   component: RegisterComponent
// })
