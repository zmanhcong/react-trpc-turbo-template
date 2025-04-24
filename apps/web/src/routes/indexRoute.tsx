// src/routes/indexRoute.tsx
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './rootRoute'
import { HomePage } from './HomePage'

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});
