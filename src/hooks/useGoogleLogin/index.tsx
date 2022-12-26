import { createUser, validateUserExists } from '@services/users';
import firebaseInitialize from '../../firebase/config';
import { useContext } from 'react';
import { AuthContext } from '@contexts/AuthContext';
import firebase from 'firebase/compat/app';

export const useGoogleLogin = () => {
  const { auth, googleProvider } = firebaseInitialize();

  const { user, setUser } = useContext(AuthContext);

  const signInWithGoogle = async () => {
    const calledGoogleProvider = googleProvider();

    if (calledGoogleProvider) {
      console.log('ENtreou');
      const { user } = await auth.signInWithPopup(calledGoogleProvider);
      const token = await user?.getIdToken();

      const result = await validateUserExists(token!);

      if (!result.data) {
        await createUser(token!);
      }

      setUser(auth.currentUser);
    }
  };

  const signOutWithGoogle = async () => {
    await auth.signOut();

    setUser(auth.currentUser);
  };

  return { signInWithGoogle, signOutWithGoogle };
};

export default useGoogleLogin;
