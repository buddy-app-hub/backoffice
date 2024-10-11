import React, { useEffect, useState } from 'react';
import UsersTable from '@/components/UsersTable';
import { User } from '@/types/User';
import {ApiUser} from "@/services/userApi";

const Home: React.FC = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const users = await ApiUser.fetchUsers();
                setUsers(users);
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return (
        <div>
            <p>Error: {error}</p>
            <button onClick={handleLogout}>Salir</button>
        </div>
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mt-4 mb-8">Usuarios</h1>
            <UsersTable users={users} />
        </div>
    );
};

export default Home;