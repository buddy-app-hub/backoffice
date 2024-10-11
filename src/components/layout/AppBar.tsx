import Image from 'next/image';
import BuddyLogo from '@/assets/buddy_logo.svg';
import {useSessionUser} from "@/hooks/useSessionUser";

export default function AppBar() {
    const { signOutUser } = useSessionUser();

    return (
        <div className={`fixed top-0 w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out`}
             style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'saturate(180%) blur(5px)' }}
        >
            <div className="flex flex-col max-w-7xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-1 lg:px-2">
                <div className="flex flex-row items-center justify-between p-4">
                    <a href="/" className="text-lg font-semibold rounded-lg tracking-widest focus:outline-none focus:shadow-outline">
                        <Image
                            priority
                            src={BuddyLogo}
                            alt="buddy"
                            width={100}
                        />
                    </a>

                </div>
                <div className={"md:flex flex-grow items-center"}>
                    <nav className="flex-col flex-grow ">
                        <ul className="flex flex-grow justify-end flex-wrap items-center">
                            <li>
                                <button onClick={signOutUser}
                                        className="flex w-40 justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                >
                                    Salir
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}