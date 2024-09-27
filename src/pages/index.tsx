import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import Home from "@/pages/Home";
import {auth} from "@/utils/firebase";
import { onAuthStateChanged } from 'firebase/auth';
import FullScreenLoader from "@/components/FullScreenLoader";
import {tokenStorage} from "@/utils/tokenStorage";
import AppBar from "@/components/layout/AppBar";
import UsersTable from "@/components/UsersTable";

const Index: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);

    const goToLogin = () => {
        tokenStorage.remove();
        router.push('/login');
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                goToLogin();
            } else {
                user.getIdToken()
                    .then(token => {
                        if (token) {
                            tokenStorage.save(token);
                            setLoading(false);
                        }
                    })
                    .catch(goToLogin)
            }
        });

        return () => unsubscribe();
    }, [auth, router]);

    if (loading) {
        return <FullScreenLoader />; // Mostrar un mensaje de carga mientras verificamos el estado
    }

    return (
        <div>
            <AppBar />

            <div className="container mx-auto p-4 pt-20">
                <Home />
            </div>
        </div>
    );
};

export default Index;
