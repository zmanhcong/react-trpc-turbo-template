import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../rootRoute'
import { YouTubePage } from '../../components/features/youtube/home/Home'

export const youtubeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'youtube',
  component: YouTubePage,
})