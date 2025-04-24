import { RouterProvider, createRouter } from '@tanstack/react-router';

import { TrpcWrapper } from './TrpcWrapper';
import './index.css';

import { router } from './router'
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return (
    <TrpcWrapper>
      <RouterProvider router={router} />
    </TrpcWrapper>
  );
}
