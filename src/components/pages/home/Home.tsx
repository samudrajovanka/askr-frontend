/**
 * ! Example for use react query on client component using hydrate from server
 */
'use client';

import { useAuth } from '@clerk/nextjs';
import { useMe } from '@/query/auth';

const Home = () => {
  const { isSignedIn } = useAuth();
  const meQuery = useMe();
  const user = isSignedIn ? meQuery.data?.data.data.user : null;

  return (
    <div>
      <p>Current user</p>

      {user && (
        <p key={user.email}>{user.name ?? user.email}</p>
      )}
    </div>
  );
};

export default Home;
