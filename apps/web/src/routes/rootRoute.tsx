// src/routes/rootRoute.tsx
import LogoutButton from '@/components/features/auth/logout/Logout'
import { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  Outlet,
  Link,
} from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import React from 'react'
import { HeaderBar } from '@/components/layout/HeaderBar'

export const rootRoute = createRootRouteWithContext<{queryClient: QueryClient}>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
})

function RootComponent() {
  return (
    <>
      <HeaderBar />
      <div style={{ height: 8 }} />
      <Outlet />
    </>
  )
}

function NotFoundComponent() {
  return (
    <div>
      <p>404 - This is the notFoundComponent configured on root route</p>
      <Link to="/">Start Over</Link>
    </div>
  )
}
