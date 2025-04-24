// src/routes/posts/postRouteComponent.tsx
import React from 'react'
import { ErrorComponentProps, useRouter } from '@tanstack/react-router'
import { useQueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query'
// import { NotFoundError, postQueryOptions } from '../../posts'
import { postRoute } from '@/routes/posts/postsRoute'
import { NotFoundError, postQueryOptions } from '@/components/posts'
// import { postRoute } from './postsRoute'

export function PostErrorComponent({ error }: ErrorComponentProps) {
  const router = useRouter()
  const queryErrorResetBoundary = useQueryErrorResetBoundary()

  React.useEffect(() => {
    queryErrorResetBoundary.reset()
  }, [queryErrorResetBoundary])

  if (error instanceof NotFoundError) {
    return <div>{error.message}</div>
  }

  return (
    <div>
      <button onClick={() => router.invalidate()}>retry</button>
      <p>Something went wrong!</p>
    </div>
  )
}

export function PostRouteComponent() {
  const { postId } = postRoute.useParams()
  const postQuery = useSuspenseQuery(postQueryOptions(postId))
  const post = postQuery.data

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{post?.title}</h4>
      <div className="text-sm">{post?.body}</div>
    </div>
  )
}
