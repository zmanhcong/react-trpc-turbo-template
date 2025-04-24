import { createLazyFileRoute, createLazyRoute } from '@tanstack/react-router';

import { trpc } from '@/TrpcWrapper';
import { Box, CircularProgress } from '@mui/material';

export const Route = createLazyRoute('/users')({
  component: UserList,
});

export default function UserList() {
    const {data, error, isPending} = trpc.user.list.useQuery()
    console.log("⛳️ log ~ UserList log ~ error: ", error?.message)
    // console.log('🪠☎️ log:  userList: ', data)

  return (
    <div>
      {isPending && (
        <Box>
          <CircularProgress />
        </Box>
      )}

      <ul>
          <li>
            {data?.user?.name} - {data?.user?.email}
          </li>
      </ul>
    </div>
  );
}