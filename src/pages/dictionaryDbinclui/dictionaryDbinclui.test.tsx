import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import firebase from 'firebase/compat/app';
import { AxiosResponse } from 'axios';

import { DictionaryDbinclui } from './index';
import { googleProviderFunc, firebaseInitialize } from '../../firebase/config';
import useGoogleLogin from '@hooks/useGoogleLogin';
import { UserEntity } from '@interfaces/UserEntity';
import { AuthContext } from '@contexts/AuthContext';
import { getDbExpression } from '@services/dbExpressions';
import { IDBExpression } from '@interfaces/IDBExpression';

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
jest.mock('@services/dbExpressions');

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

const mockGetDbExpressions = getDbExpression as jest.MockedFunction<
  typeof getDbExpression
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

describe('Teste do dictionaryDbinclui', () => {
  afterEach(() => {
    mockGetDbExpressions.mockClear();
  });
  it('Deve exibir o título da página "Dicionário DBInclui"', async () => {
    await act(async () => {
      render(<DictionaryDbinclui />);
    });

    const pageTitle = 'Dicionário DBInclui';
    const textTitle = screen.getByText(pageTitle);
    expect(textTitle).toBeVisible();
  });

  it('Deve chamar a função getDBExpressions', async () => {
    mockGetDbExpressions.mockImplementation(
      async () =>
        ({
          data: { data: [] },
        } as unknown as Promise<AxiosResponse<{ data: IDBExpression[] }>>),
    );

    await act(async () => {
      render(<DictionaryDbinclui />);
    });
    expect(mockGetDbExpressions).toBeCalledTimes(1);
  });

  it('Deve aparecer as expressões se tiver expressões salvas.', async () => {
    const expressionsMock: IDBExpression[] = [
      {
        _id: '63bc1941e62c6644773b98e5',
        expression: 'teste',
        author: 'autor teste',
        deleted: false,
        favoriteOf: '123098102983019823012',
        created_at: '2023-01-09T13:40:17.414Z',
        updated_at: '2023-01-10T13:02:52.228Z',
      },
      {
        _id: '63bc1941e62c6644773b98e5',
        expression: 'teste 2',
        author: 'autor teste 2',
        deleted: true,
        favoriteOf: '123098102983019823012',
        created_at: '2023-01-09T13:40:17.414Z',
        updated_at: '2023-01-10T13:02:52.228Z',
      },
    ];

    mockGetDbExpressions.mockImplementation(
      async () =>
        ({
          data: { data: expressionsMock },
        } as unknown as Promise<AxiosResponse<{ data: IDBExpression[] }>>),
    );

    await act(async () => {
      render(<DictionaryDbinclui />);
    });

    const Expression = screen.getByText('teste');

    expect(Expression).toBeInTheDocument();
  });
});
