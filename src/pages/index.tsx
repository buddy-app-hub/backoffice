import React, { useEffect, useState } from 'react';
import UsersTable from '../components/UsersTable';
import { fetchUsers } from '../services/api';
import { User } from '../types/User';

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFkYmUwNmI1ZDdjMmE3YzA0NDU2MzA2MWZmMGZlYTM3NzQwYjg2YmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYnVkZHktZTI5ZGMiLCJhdWQiOiJidWRkeS1lMjlkYyIsImF1dGhfdGltZSI6MTcyMjkwNDkzNywidXNlcl9pZCI6Im9nNzZYcm5jS1ZNVTZXdXo3VXNWVEVhRkljWTIiLCJzdWIiOiJvZzc2WHJuY0tWTVU2V3V6N1VzVlRFYUZJY1kyIiwiaWF0IjoxNzIyOTA0OTM3LCJleHAiOjE3MjI5MDg1MzcsImVtYWlsIjoiYWd1czEwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhZ3VzMTBAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.cK8hs37VS1wyXJupCw9SyH56JJKxCr11JSERLSF87awLhL2L81wX82J2Xr2_fVNjOY_ZL4HpWYz6z6Kmgr9HUH__JnfpEFUCh7Vi1qTdEgfUwF2kF6VrzVflXr89k6RUK3rWJxpHtR43GYfeoZkM8RKMKkR-EqfrmtntHJwL98zWdK3E3Puv9Z42ga9wIKpe__i3t5a62I84FJyjYCm6KQWxHCD2-iz-vtnDjKp-nFuc68_Bi7ckUXa4i0W3sV-K3CeaJ77FmHZexaRX2HrgGVBpsmWoFS0v7RN63ADkGvpiULpubHs9LvLbTJRd_MH_qjcpUjyTbbx8LzwxQV6Agw';

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await fetchUsers(token);
        setUsers(users);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <UsersTable users={users} />
    </div>
  );
};

export default Home;
