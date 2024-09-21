import React, { useEffect, useState } from 'react';
import UsersTable from '../components/UsersTable';
import { fetchUsers } from '../services/api';
import { User } from '../types/User';

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = process.env.NEXT_PUBLIC_TMP_FIREBASE_TOKEN || 'no-token'; // TODO: replace with auth method to log in as admin and get token

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
      <h1 className="text-2xl font-bold mt-4 mb-8">Usuarios</h1>
      <UsersTable users={users} />
    </div>
  );
};

export default Home;
