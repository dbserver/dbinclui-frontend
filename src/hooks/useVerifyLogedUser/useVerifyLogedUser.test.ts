import React, { useContext, useState } from 'react';
import { googleProviderFunc, firebaseInitialize } from '../../firebase/config';
import firebase from 'firebase/compat/app';
import useVerifyLogedUser from '.';

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

jest.mock('react');

const mockUseContext = useContext as jest.MockedFunction<typeof useContext>;
const mockUseState = useState as jest.MockedFunction<typeof useState>;

describe('useVerifyLogedUser', () => {
  describe('verifyLogedGoogleUser', () => {
    afterAll(() => {
      jest.clearAllMocks();
    });

    const mockSetUser = jest.fn();

    const mockOnAuthStateChanged = jest.fn();

    const mockSetLoadingUser = jest.fn();
    test('Deve verificar se já existe um usuário logado', () => {
      mockUseContext.mockReturnValue({
        user: {},
        setUser: mockSetUser,
      });
      mockUseState.mockReturnValue([undefined, mockSetLoadingUser]);
      mockGoogleProviderFunc.mockImplementation(() => {
        return {} as firebase.auth.GoogleAuthProvider;
      });
      mockFirebaseInitialize.mockReturnValue({
        app: {} as any,

        auth: {
          onAuthStateChanged: mockOnAuthStateChanged,
        } as any,
        googleProvider: jest.fn().mockReturnValue(true),
      });

      const { verifyLogedGoogleUser } = useVerifyLogedUser();

      verifyLogedGoogleUser();

      expect(mockOnAuthStateChanged).toBeCalledTimes(1);
    });
  });
});
