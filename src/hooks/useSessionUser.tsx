import {signOut} from "firebase/auth";
import {useRouter} from "next/router";
import {auth} from "../utils/firebase";

export const useSessionUser = () => {
  const router = useRouter();

  const signOutUser = async () => {
    try {
      await signOut(auth);
      router.push('/login'); // Redirige después de cerrar sesión
    } catch (error) {
      console.error('Error al desloguearse:', error);
    }
  }

  return { signOutUser }
}
