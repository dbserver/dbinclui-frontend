import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { googleProviderFunc, firebaseInitialize } from '../../firebase/config';
import firebase from 'firebase/compat/app';
import useGoogleLogin from '@hooks/useGoogleLogin';
import SignOutModal from '.';

jest.mock('../../firebase/config');
jest.mock('@hooks/useGoogleLogin');

jest.mock('firebase/compat/app', () => ({
  initializeApp: jest.fn(),
  apps: ['app'],
}));

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const useHref = jest.fn();
  return {
    useHref,
    useNavigate: () => mockedNavigate,
  };
});

const mockGoogleProviderFunc = googleProviderFunc as jest.MockedFunction<
  typeof googleProviderFunc
>;

const mockFirebaseInitialize = firebaseInitialize as jest.MockedFunction<
  typeof firebaseInitialize
>;

const mockUseGoogleLogin = useGoogleLogin as jest.MockedFunction<
  typeof useGoogleLogin
>;

describe('SignOutModal', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('Deve renderizar o botão "Sair"', () => {
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
      <SignOutModal
        anchorElSignInModal={mockAnchorElSignInModal}
        setAnchorElSignInModal={mockSetAnchorElSignInModal}
      />,
    );

    const modalTitle = screen.getByText('Sair');

    expect(modalTitle).toBeInTheDocument();
  });

  test('Deve renderizar o botão "Meu dicionário"', () => {
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
      <SignOutModal
        anchorElSignInModal={mockAnchorElSignInModal}
        setAnchorElSignInModal={mockSetAnchorElSignInModal}
      />,
    );

    const modalTitle = screen.getByText('Meu dicionário');

    expect(modalTitle).toBeInTheDocument();
  });
});
