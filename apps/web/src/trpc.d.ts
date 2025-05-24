// Type declarations for tRPC
import '@trpc/react-query';
import { AppRouter } from '@api/router';

declare module '@trpc/react-query' {
  export interface CreateTRPCReactBase<TRouter extends AnyRouterObject> {
    createClient(opts: any): any;
    useContext(): any;
  }
}
