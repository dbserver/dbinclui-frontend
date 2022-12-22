import { useAuthContext } from '@contexts/AuthContext';
import { createUser, validateUserExists } from '@services/users';
import { auth, firebase } from '../../firebase/config';

export const useGoogleLogin = () => {
  const { setUser, user } = useAuthContext();

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const { user } = await auth.signInWithPopup(provider);
    const token = await user?.getIdToken();

    const { data } = await validateUserExists(token!);

    if (!data) {
      await createUser(token!);
    }

    setUser(auth.currentUser);
  };

  const signOutWithGoogle = async () => {
    await auth.signOut();

    setUser(auth.currentUser);
  };

  return { signInWithGoogle, signOutWithGoogle };
};

export default useGoogleLogin;
