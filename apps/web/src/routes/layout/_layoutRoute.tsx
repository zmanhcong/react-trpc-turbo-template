// src/routes/layout/_layoutRoute.tsx
import React from 'react'
import { createRoute, Link, Outlet } from '@tanstack/react-router'
import { rootRoute } from '../rootRoute'

// ─────────────────────────────────────────────────────────────────────────────
// Layout cấp 1
// ─────────────────────────────────────────────────────────────────────────────
export const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: '_layout',
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div className="p-2">
      <div className="border-b">I'm a layout</div>
      <Outlet />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Layout cấp 2
// ─────────────────────────────────────────────────────────────────────────────
export const layout2Route = createRoute({
  getParentRoute: () => layoutRoute,
  id: '_layout-2',
  component: Layout2Component,
})

function Layout2Component() {
  return (
    <div>
      <div>I'm a nested layout</div>
      <div className="flex gap-2 border-b">
        <Link to="/layout-a" activeProps={{ className: 'font-bold' }}>
          Layout A
        </Link>
        <Link to="/layout-b" activeProps={{ className: 'font-bold' }}>
          Layout B
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Layout A route
// ─────────────────────────────────────────────────────────────────────────────
export const layoutARoute = createRoute({
  getParentRoute: () => layout2Route,
  path: '/layout-a',
  component: LayoutAComponent,
})

function LayoutAComponent() {
  return <div>I'm layout A!</div>
}

// ─────────────────────────────────────────────────────────────────────────────
// Layout B route
// ─────────────────────────────────────────────────────────────────────────────
export const layoutBRoute = createRoute({
  getParentRoute: () => layout2Route,
  path: '/layout-b',
  component: LayoutBComponent,
})

function LayoutBComponent() {
  return <div>I'm layout B!</div>
}
