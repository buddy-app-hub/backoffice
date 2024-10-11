import {useState} from "react";
import {useForm} from "react-hook-form";
import {browserLocalPersistence, setPersistence, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/utils/firebase";
import {FirebaseError} from "@firebase/app";
import FullScreenLoader from "@/components/FullScreenLoader";

enum LoginFormDataFields {
    Mail = 'email',
    Password = 'password'
}

interface LoginFormData {
    [LoginFormDataFields.Mail]: string,
    [LoginFormDataFields.Password]: string,
}

const invalidCredentialMessages = ['auth/invalid-credential', 'auth/missing-password', 'auth/user-not-found'];

interface LoginFormProps {
    onSuccessfulLogin: () => void
}

export default function LoginForm({ onSuccessfulLogin }: LoginFormProps) {
    const { register, handleSubmit } = useForm<LoginFormData>();
    const [loginError, setLoginError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    const cleanErrors = () => !!loginError && setLoginError(undefined);

    const onLogin = async (data: LoginFormData) => {
        setLoading(true);
        cleanErrors();

        setPersistence(auth, browserLocalPersistence)
            .then(async () => {
                const userCredential = await signInWithEmailAndPassword(auth, data[LoginFormDataFields.Mail], data[LoginFormDataFields.Password]);
                onSuccessfulLogin();
                return userCredential;
            })
            .catch((error) => {
                console.error("Error al establecer la persistencia:", error);
                if (error instanceof FirebaseError) {
                    const errorCode = error.code;
                    if (invalidCredentialMessages.includes(errorCode)) {
                        setLoginError('Las credenciales son inválidas. Por favor, verificá los datos ingresados.');
                        return;
                    }
                }

                setLoginError('Ocurrió un error, por favor intenta más tarde.');
            })
            .finally(() => setLoading(false));
    }

    return (
        <form className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
              onSubmit={handleSubmit(onLogin)}
        >
            <div>
                <label htmlFor="email" className="block text-xs text-gray-600 uppercase">
                    Mail
                </label>
                <input
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@admin.com"
                    autoComplete="email"
                    required
                    {...register(LoginFormDataFields.Mail)}
                    onChange={cleanErrors}
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-xs text-gray-600 uppercase">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                    {...register(LoginFormDataFields.Password)}
                    onChange={cleanErrors}
                />
            </div>

            <div>
                <button type="submit"
                        className="flex w-full justify-center rounded-md
                        px-3 py-1.5 text-sm
                        font-semibold leading-6 text-white s
                        hadow-sm
                        items-center
                        focus-visible:outline
                        focus-visible:outline-2 focus-visible:outline-offset-2"
                        disabled={loading}
                >
                    {
                        loading &&
                            <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                            </svg>
                    }

                    {loading ? "Ingresando..." : "Ingresar"}
                </button>
            </div>

            {
                loginError &&
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                    {loginError}
                </div>
            }
        </form>
    );
}