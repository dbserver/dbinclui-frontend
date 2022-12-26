import useGoogleLogin from '.';
import { createUser, validateUserExists } from '@services/users';
import { useContext } from 'react';
import { AxiosResponse } from 'axios';
import { googleProviderFunc, firebaseInitialize } from '../../firebase/config';
import firebase from 'firebase/compat/app';

jest.mock('../../firebase/config');

const mockGoogleProviderFunc = googleProviderFunc as jest.MockedFunction<
  typeof googleProviderFunc
>;

const mockFirebaseInitialize = firebaseInitialize as jest.MockedFunction<
  typeof firebaseInitialize
>;

const mockGetIdToken = jest.fn().mockReturnValue('tokenValido');

jest.mock('firebase/compat/app', () => ({
  initializeApp: jest.fn(),
  apps: ['app'],
}));

jest.mock('react');

const mockUseContext = useContext as jest.MockedFunction<typeof useContext>;

jest.mock('@services/users');

const mockValidateUserExists = validateUserExists as jest.MockedFunction<
  typeof validateUserExists
>;

const mockCreateUser = createUser as jest.MockedFunction<typeof createUser>;

const mockSetUser = jest.fn();

describe('useLoginGoogle', () => {
  describe('signInWithGoogle', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('Deve logar um usuário e inseri-lo no banco caso ainda nao esteja', async () => {
      mockUseContext.mockReturnValue({
        user: {},
        setUser: mockSetUser,
      });
      mockGoogleProviderFunc.mockImplementation(() => {
        return {} as firebase.auth.GoogleAuthProvider;
      });
      mockFirebaseInitialize.mockReturnValue({
        app: {} as any,
        auth: {
          signInWithPopup: jest.fn().mockReturnValue({
            user: {
              getIdToken: mockGetIdToken,
            },
          }),
        } as any,
        googleProvider: jest.fn().mockReturnValue(true),
      });

      mockValidateUserExists.mockResolvedValue({
        data: false,
      } as unknown as Promise<AxiosResponse>);

      const { signInWithGoogle } = useGoogleLogin();

      await signInWithGoogle();

      expect(mockGetIdToken).toBeCalledTimes(1);
      expect(mockValidateUserExists).toBeCalledTimes(1);
      expect(mockCreateUser).toBeCalledTimes(1);
      expect(mockSetUser).toBeCalledTimes(1);
    });

    test('Deve logar o usuário e ', async () => {
      mockUseContext.mockReturnValue({
        user: {},
        setUser: mockSetUser,
      });
      mockGoogleProviderFunc.mockImplementation(() => {
        return {} as firebase.auth.GoogleAuthProvider;
      });
      mockFirebaseInitialize.mockReturnValue({
        app: {} as any,
        auth: {
          signInWithPopup: jest.fn().mockReturnValue({
            user: {
              getIdToken: mockGetIdToken,
            },
          }),
        } as any,
        googleProvider: jest.fn().mockReturnValue(true),
      });

      mockValidateUserExists.mockResolvedValue({
        data: true,
      } as unknown as Promise<AxiosResponse>);

      const { signInWithGoogle } = useGoogleLogin();

      await signInWithGoogle();

      expect(mockGetIdToken).toBeCalledTimes(1);
      expect(mockValidateUserExists).toBeCalledTimes(1);
      expect(mockCreateUser).not.toBeCalled();
      expect(mockSetUser).toBeCalledTimes(1);
    });
  });

  describe('signOutWithGoogle', () => {
    const mockSignOut = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('Deve deslogar o usuário', async () => {
      mockUseContext.mockReturnValue({
        user: {},
        setUser: mockSetUser,
      });
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
      expect(mockSetUser).toBeCalledTimes(1);
    });
  });
});
