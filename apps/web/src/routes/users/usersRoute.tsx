import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../rootRoute'
import UserList from '@/components/features/user/list/index.lazy'

export const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'users',
}).lazy(() => import('@/components/features/user/list/index.lazy').then((d) => d.Route))

export const usersIndexRoute = createRoute({
  getParentRoute: () => usersRoute,
  path: '/',
  component: UserList,
})
