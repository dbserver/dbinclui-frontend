import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import firebase from 'firebase/compat/app';
import { AxiosResponse } from 'axios';

import MyDictionary from './index';
import { googleProviderFunc, firebaseInitialize } from '../../firebase/config';
import useGoogleLogin from '@hooks/useGoogleLogin';
import { UserEntity } from '@interfaces/UserEntity';
import { AuthContext } from '@contexts/AuthContext';
import {
  ExpressionInterface,
  getUsersExpressions,
} from '@services/userExpressions';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const useHref = jest.fn();
  return {
    useHref,
    useNavigate: () => mockedNavigate,
  };
});

jest.mock('../../firebase/config');
jest.mock('@hooks/useGoogleLogin');
jest.mock('@services/userExpressions');

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

const mockGetUsersExpressions = getUsersExpressions as jest.MockedFunction<
  typeof getUsersExpressions
>;

const user: UserEntity = {
  displayName: 'Raul',
  email: 'raul@email.com',
  photoURL: 'www.imagem.jpg',
  token: '123',
  uid: '1',
  _id: '1',
  admin: false,
};

const setUser = jest.fn();

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

describe('Teste do MyDictionary', () => {
  it('Deve exibir o título da página "Meu dicionario"', async () => {
    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <MyDictionary />
        </AuthContext.Provider>,
      );
    });

    const pageTitle = 'Meu Dicionário';
    const textTitle = screen.getByText(pageTitle);
    expect(textTitle).toBeVisible();
  });

  it('Deve chamar a função getUserExpressions', async () => {
    mockGetUsersExpressions.mockImplementation(
      async () =>
        ({
          data: { data: [] },
        } as unknown as Promise<
          AxiosResponse<{ data: ExpressionInterface[] }>
        >),
    );

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <MyDictionary />
        </AuthContext.Provider>,
      );

      expect(mockGetUsersExpressions).toBeCalledTimes(1);
    });
  });

  // it('teste', async () => {
  //   const dataMockGetUsersExpressions: ExpressionInterface[] = [
  //     {
  //       _id: '123',
  //       expression: 'Expressão teste',
  //       favorite: false,
  //     },
  //   ];

  //   mockGetUsersExpressions.mockImplementation(
  //     async () =>
  //       ({
  //         data: { data: dataMockGetUsersExpressions },
  //       } as unknown as Promise<
  //         AxiosResponse<{ data: ExpressionInterface[] }>
  //       >),
  //   );

  //   await act(async () => {
  //     render(
  //       <AuthContext.Provider value={{ user, setUser }}>
  //         <MyDictionary />
  //       </AuthContext.Provider>,
  //     );

  //     // const textTitle = screen.getByText('Expressão teste');
  //     // expect(textTitle).toBeVisible();
  //     screen.logTestingPlaygroundURL();
  //     // expect(screen.getAllByRole('span', { name: /title/i })).toHaveLength(3); //Elemento de title
  //   });
  // });
});
