import { createRouter } from '@tanstack/react-router'
import { postsRoute, postRoute, postsIndexRoute } from './routes/posts/postsRoute'
import { layoutRoute, layout2Route, layoutARoute, layoutBRoute } from './routes/layout/_layoutRoute'
import { rootRoute } from './routes/rootRoute'
import { indexRoute } from './routes/indexRoute'
import { QueryClient } from '@tanstack/react-query'
import { usersIndexRoute, usersRoute } from './routes/users/usersRoute'
import { login, loginRoute } from './routes/auth/authRoute'
import { registerRouter } from './routes/auth/registerRoute'
import { uploadCsvRoute } from './routes/upload/uploadCsvRoute'

const routeTree = rootRoute.addChildren([
  // Posts
  postsRoute.addChildren([postRoute, postsIndexRoute]),

  usersRoute.addChildren([usersIndexRoute]),
  loginRoute.addChildren([login]),
  registerRouter,
  
  // Layout
  layoutRoute.addChildren([
    layout2Route.addChildren([layoutARoute, layoutBRoute]),
  ]),

  indexRoute,
  uploadCsvRoute,
])

const queryClient = new QueryClient()

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  // scrollRestoration: true,
  context: {
    queryClient,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
