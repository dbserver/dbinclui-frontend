import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export const googleProviderFunc = () => {
  return new firebase.auth.GoogleAuthProvider();
};

export const firebaseInitialize = () => {
  if (firebase.apps.length === 0) {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    };

    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const googleProvider = googleProviderFunc;

    return { app, auth, googleProvider };
  }

  return {
    app: firebase.app(),
    auth: firebase.auth(),
    googleProvider: googleProviderFunc,
  };
};

export default firebaseInitialize;
