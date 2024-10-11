import Image from 'next/image';
import BuddyLogo from '@/assets/buddy_logo.svg';
import LoginForm from '@/components/login/LoginForm';
import {useRouter} from "next/router";
import {useEffect} from "react";
import {tokenStorage} from "@/utils/tokenStorage";

export default function Login() {
    const router = useRouter();

    const onSuccessfulLogin = () => router.push('/');

    useEffect(() => {
        if (!!tokenStorage.get())
            onSuccessfulLogin();
    }, []);

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <Image
                        priority
                        src={BuddyLogo}
                        alt="buddy"
                        width={200}
                    />
                </div>

                <LoginForm onSuccessfulLogin={onSuccessfulLogin} />
            </div>
        </div>
    );
}