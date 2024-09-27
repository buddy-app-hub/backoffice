import {getApp, getApps, initializeApp} from 'firebase/app';
import 'firebase/auth';
import {getAuth} from "@firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAFESG7jn79nhIoTVfOyp_fX1KlWGueN9M",
    authDomain: "buddy-e29dc.firebaseapp.com",
    projectId: "buddy-e29dc",
    storageBucket: "buddy-e29dc.appspot.com",
    messagingSenderId: "720236276661",
    appId: "1:720236276661:web:facfccd54bf53e867cc7fc",
    measurementId: "G-YME1PRNZH3"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export { app, auth }
