import React, { useEffect, useState } from 'react';
import UsersTable from '@/components/user/UsersTable';
import { User } from '@/types/User';
import {ApiUser} from "@/services/userApi";
import {Card} from "@/components/layout/Card";
import {useSessionUser} from "@/hooks/useSessionUser";

const Home: React.FC = () => {
    const { signOutUser } = useSessionUser();

    const [users, setUsers] = useState<User[]>();
    const [error, setError] = useState<string | null>(null);

    const loadUsers = async () => {
        setUsers(undefined);

        try {
            const users = await ApiUser.fetchUsers();
            setUsers(users);
        } catch (error) {
            setError(error)
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    if (error) return (
        <div>
            <p>Error: {error}</p>
            <button onClick={signOutUser}>Salir</button>
        </div>
    );

    return (
        <div>
            <Card title={"Usuarios"}>
                <UsersTable users={users} onReloadTable={loadUsers} />
            </Card>
        </div>
    );
};

export default Home;