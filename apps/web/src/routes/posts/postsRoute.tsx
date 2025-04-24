import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../rootRoute'
import { postsQueryOptions, NotFoundError, postQueryOptions } from '../../components/posts'
import { PostsIndexRouteComponent } from './postsIndexRouteComponent'
import { PostErrorComponent, PostRouteComponent } from '@/components/postRouteComponent'

// Route cha: /posts
export const postsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'posts',
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(postsQueryOptions),
}).lazy(() => import('./posts.lazy').then((d) => d.Route))

// Route con 1: /posts/
export const postsIndexRoute = createRoute({
  getParentRoute: () => postsRoute,
  path: '/',
  component: PostsIndexRouteComponent,
})

// Route con 2: /posts/$postId
export const postRoute = createRoute({
  getParentRoute: () => postsRoute,
  path: '$postId',
  errorComponent: PostErrorComponent,
  // loader ví dụ:
  loader: ({ context, params: { postId } }) => {
    if (context.queryClient) {
      return context.queryClient.ensureQueryData(postQueryOptions(postId))
    }
    return
  },
  component: PostRouteComponent,
})
