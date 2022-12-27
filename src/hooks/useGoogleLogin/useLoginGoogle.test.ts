import useGoogleLogin from '.';

import { googleProviderFunc, firebaseInitialize } from '../../firebase/config';
import firebase from 'firebase/compat/app';

jest.mock('../../firebase/config');

const mockGoogleProviderFunc = googleProviderFunc as jest.MockedFunction<
  typeof googleProviderFunc
>;

const mockFirebaseInitialize = firebaseInitialize as jest.MockedFunction<
  typeof firebaseInitialize
>;

jest.mock('firebase/compat/app', () => ({
  initializeApp: jest.fn(),
  apps: ['app'],
}));

describe('useLoginGoogle', () => {
  describe('signInWithGoogle', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    const mockSignInWithPopup = jest.fn().mockReturnValue({
      user: {
        getIdToken: jest.fn().mockReturnValue('tokenValido'),
      },
    });

    test('Deve logar o usuário', async () => {
      mockGoogleProviderFunc.mockImplementation(() => {
        return {} as firebase.auth.GoogleAuthProvider;
      });
      mockFirebaseInitialize.mockReturnValue({
        app: {} as any,
        auth: {
          signInWithPopup: mockSignInWithPopup,
        } as any,
        googleProvider: jest.fn().mockReturnValue(true),
      });

      const { signInWithGoogle } = useGoogleLogin();

      await signInWithGoogle();

      expect(mockSignInWithPopup).toBeCalledTimes(1);
    });
  });

  describe('signOutWithGoogle', () => {
    const mockSignOut = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('Deve deslogar o usuário', async () => {
      mockGoogleProviderFunc.mockImplementation(() => {
        return {} as firebase.auth.GoogleAuthProvider;
      });
      mockFirebaseInitialize.mockReturnValue({
        app: {} as any,
        auth: {
          signOut: mockSignOut,
        } as any,
        googleProvider: jest.fn().mockReturnValue(true),
      });

      const { signOutWithGoogle } = useGoogleLogin();

      await signOutWithGoogle();

      expect(mockSignOut).toBeCalledTimes(1);
    });
  });
});
