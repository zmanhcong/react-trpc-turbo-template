// trpc.ts - Separate file for tRPC setup
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@api/router';

// Add explicit type import to make the type portable
import type { CreateTRPCClientOptions } from '@trpc/client';

// This type approach fixes the TS2742 error by making the type fully specified
type TRPCReactClient = ReturnType<typeof createTRPCReact<AppRouter>>;

// Create tRPC client with explicit type annotation
export const trpc = createTRPCReact<AppRouter>() as TRPCReactClient;
