import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignInModal } from './index';
import '@testing-library/jest-dom/extend-expect';
import { googleProviderFunc, firebaseInitialize } from '../../firebase/config';
import firebase from 'firebase/compat/app';
import useGoogleLogin from '@hooks/useGoogleLogin';

jest.mock('../../firebase/config');
jest.mock('@hooks/useGoogleLogin');

jest.mock('firebase/compat/app', () => ({
  initializeApp: jest.fn(),
  apps: ['app'],
}));

const mockGoogleProviderFunc = googleProviderFunc as jest.MockedFunction<
  typeof googleProviderFunc
>;

const mockFirebaseInitialize = firebaseInitialize as jest.MockedFunction<
  typeof firebaseInitialize
>;

const mockUseGoogleLogin = useGoogleLogin as jest.MockedFunction<
  typeof useGoogleLogin
>;

describe('SignInModal', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Deve renderizar o texto "Faça Login"', () => {
    const mockAnchorElSignInModal = {} as HTMLElement;
    const mockSetAnchorElSignInModal = jest.fn();

    mockGoogleProviderFunc.mockImplementation(() => {
      return {} as firebase.auth.GoogleAuthProvider;
    });
    mockFirebaseInitialize.mockReturnValue({
      app: {} as any,
      auth: {
        signInWithPopup: jest.fn().mockReturnValue({
          user: {
            getIdToken: jest.fn(),
          },
        }),
      } as any,
      googleProvider: jest.fn().mockReturnValue(true),
    });

    mockUseGoogleLogin.mockReturnValue({
      signInWithGoogle: jest.fn(),
      signOutWithGoogle: jest.fn(),
    });

    render(
      <SignInModal
        anchorElSignInModal={mockAnchorElSignInModal}
        setAnchorElSignInModal={mockSetAnchorElSignInModal}
      />,
    );

    const modalTitle = screen.getByText('Faça Login');

    expect(modalTitle).toBeInTheDocument();
  });

  test('Deve renderizar o botão "Continuar com Google"', () => {
    const mockAnchorElSignInModal = {} as HTMLElement;
    const mockSetAnchorElSignInModal = jest.fn();

    mockGoogleProviderFunc.mockImplementation(() => {
      return {} as firebase.auth.GoogleAuthProvider;
    });
    mockFirebaseInitialize.mockReturnValue({
      app: {} as any,
      auth: {
        signInWithPopup: jest.fn().mockReturnValue({
          user: {
            getIdToken: jest.fn(),
          },
        }),
      } as any,
      googleProvider: jest.fn().mockReturnValue(true),
    });

    mockUseGoogleLogin.mockReturnValue({
      signInWithGoogle: jest.fn(),
      signOutWithGoogle: jest.fn(),
    });

    render(
      <SignInModal
        anchorElSignInModal={mockAnchorElSignInModal}
        setAnchorElSignInModal={mockSetAnchorElSignInModal}
      />,
    );

    const googleLoginBtn = screen.getByRole('button', {
      name: /icone de login com google continuar com google/i,
    });

    expect(googleLoginBtn).toBeInTheDocument();
  });

  test('Botão "Continuar com Google" deve chama as função "setAnchorElSignInModal()"', async () => {
    const mockAnchorElSignInModal = {} as HTMLElement;
    const mockSetAnchorElSignInModal = jest.fn();

    mockGoogleProviderFunc.mockImplementation(() => {
      return {} as firebase.auth.GoogleAuthProvider;
    });
    mockFirebaseInitialize.mockReturnValue({
      app: {} as any,
      auth: {
        signInWithPopup: jest.fn().mockReturnValue({
          user: {
            getIdToken: jest.fn(),
          },
        }),
      } as any,
      googleProvider: jest.fn().mockReturnValue(true),
    });

    mockUseGoogleLogin.mockReturnValue({
      signInWithGoogle: jest.fn(),
      signOutWithGoogle: jest.fn(),
    });

    render(
      <SignInModal
        anchorElSignInModal={mockAnchorElSignInModal}
        setAnchorElSignInModal={mockSetAnchorElSignInModal}
      />,
    );

    const googleLoginBtn = screen.getByRole('button', {
      name: /icone de login com google continuar com google/i,
    });

    userEvent.click(googleLoginBtn);

    await waitFor(() => {
      expect(mockSetAnchorElSignInModal).toBeCalledTimes(1);
    });
  });

  test('Botão "Continuar com Google" deve chama as função "(signInWithGoogle())"', async () => {
    const mockAnchorElSignInModal = {} as HTMLElement;
    const mockSetAnchorElSignInModal = jest.fn();
    const mockSignInWithGoogle = jest.fn();

    mockGoogleProviderFunc.mockImplementation(() => {
      return {} as firebase.auth.GoogleAuthProvider;
    });
    mockFirebaseInitialize.mockReturnValue({
      app: {} as any,
      auth: {
        signInWithPopup: jest.fn().mockReturnValue({
          user: {
            getIdToken: jest.fn(),
          },
        }),
      } as any,
      googleProvider: jest.fn().mockReturnValue(true),
    });

    mockUseGoogleLogin.mockReturnValue({
      signInWithGoogle: mockSignInWithGoogle,
      signOutWithGoogle: jest.fn(),
    });

    render(
      <SignInModal
        anchorElSignInModal={mockAnchorElSignInModal}
        setAnchorElSignInModal={mockSetAnchorElSignInModal}
      />,
    );

    const googleLoginBtn = screen.getByRole('button', {
      name: /icone de login com google continuar com google/i,
    });

    userEvent.click(googleLoginBtn);

    await waitFor(() => {
      expect(mockSignInWithGoogle).toBeCalledTimes(1);
    });
  });
});
