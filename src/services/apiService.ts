import {tokenStorage} from "@/utils/tokenStorage";
import {signOut} from "firebase/auth";
import {auth} from "@/utils/firebase";

const backofficeUrl = process.env.NEXT_PUBLIC_BACKOFFICE_URL;

const fetchWithAuth = async (url: string): Promise<Response> => {
    const token = tokenStorage.get();
    const finalUrl = `/api${url}`;
    let headers = {};

    if (token)
        headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
            'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    };

    return fetch(finalUrl, {
        headers: headers,
    });
};

const getResponseBody = async (response: Response) => {
    if (!response.ok) throw response;

    return await response.json();
};

const getError = async (error) => {
    if (error.status === 401) {
        await signOut(auth);
        window.location.href = '/';
    }
    const errorData = "Failed to fetch";
    return Promise.reject(errorData);
};

export const ApiService = {
    get: async (url: string) =>
        fetchWithAuth(url).then(getResponseBody).catch(getError)
}

