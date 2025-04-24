import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../rootRoute'
import LoginComponent from '@/components/features/auth/login/index.lazy'

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'login',
}).lazy(() => import('@/components/features/auth/login/index.lazy').then((d) => d.Route))

export const login = createRoute({
  getParentRoute: () => loginRoute,
  path: '/',
  component: LoginComponent,
})
