import firebaseInitialize from '../../firebase/config';

export const useGoogleLogin = () => {
  const { auth, googleProvider } = firebaseInitialize();

  const signInWithGoogle = async () => {
    const calledGoogleProvider = googleProvider();

    if (calledGoogleProvider) {
      const { user } = await auth.signInWithPopup(calledGoogleProvider);

      if (!user) {
        throw new Error('Falha na autenticação de usuário');
      }
    }
  };

  const signOutWithGoogle = async () => {
    await auth.signOut();
  };

  return { signInWithGoogle, signOutWithGoogle };
};

export default useGoogleLogin;
