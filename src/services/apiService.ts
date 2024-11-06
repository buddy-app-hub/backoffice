import {signOut} from "firebase/auth";
import { auth } from "src/utils/firebase";
import { tokenStorage } from "src/utils/tokenStorage";

const fetchWithoutAuth = async (pathBase: string, url: string, methods: string, body: any = undefined): Promise<Response> => {
  const finalUrl = `${pathBase}${url}`;

  return fetch(finalUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: methods,
    body: body ? JSON.stringify(body) : undefined
  });
};

const fetchWithAuth = async (pathBase: string, url: string, methods: string, body: any = undefined): Promise<Response> => {
  const token = tokenStorage.get();
  const finalUrl = `${pathBase}${url}`;
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
    method: methods,
    body: body
  });
};

const getResponseBody = async (response: Response) => {
  if (!response.ok) throw response;

  return await response.json();
};

const getError = async (error: any) => {
  if (error.status === 401) {
    await signOut(auth);
  }
  const errorData = "Failed to fetch";

  return Promise.reject(errorData);
};

export const ApiService = {
  _path: '/api',

  get: async (url: string) =>
    fetchWithAuth(ApiService._path, url, "GET").then(getResponseBody).catch(getError),

  post: async (url: string, body: any = undefined) =>
    fetchWithAuth(ApiService._path, url, "POST", body).then().catch(getError)
}

export const ApiPaymentsService = {
  _path: '/payments-api',

  get: async (url: string) =>
    fetchWithoutAuth(ApiPaymentsService._path, url, "GET").then(getResponseBody).catch(getError),

  post: async (url: string, body: any = undefined) =>
    fetchWithoutAuth(ApiPaymentsService._path, url, "POST", body).then().catch(getError),

  put: async (url: string, body: any = undefined) =>
    fetchWithoutAuth(ApiPaymentsService._path, url, "PUT", body).then().catch(getError)
}

