import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { AxiosResponse } from 'axios';

import { DictionaryDbinclui } from './index';

import { getDbExpression } from '@services/dbExpressions';
import { IDBExpression } from '@interfaces/IDBExpression';

import { AuthContext } from '../../contexts/AuthContext';
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const useHref = jest.fn();
  return {
    useHref,
    useNavigate: () => mockedNavigate,
  };
});

jest.mock('@services/dbExpressions');

const mockGetDbExpressions = getDbExpression as jest.MockedFunction<
  typeof getDbExpression
>;

describe('Teste do dictionaryDbinclui', () => {
  afterEach(() => {
    jest.clearAllMocks();
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

  it('Deve renderizar as expressões salvas.', async () => {
    const expressionsMock: IDBExpression[] = [
      {
        _id: '1',
        expression: 'teste',
        author: 'autor teste',
        deleted: false,
        favoriteOf: '123098102983019823012',
        created_at: '2023-01-09T13:40:17.414Z',
        updated_at: '2023-01-10T13:02:52.228Z',
      },
      {
        _id: '2',
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
  it('Deve renderizar um erro caso o usuario deslogado clique no botao de deletar expressão', async () => {
    const expressionsMock: IDBExpression[] = [
      {
        _id: '1',
        expression: 'teste',
        author: 'autor teste',
        deleted: false,
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

    const user = null;
    const setUser = jest.fn();

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <DictionaryDbinclui />
        </AuthContext.Provider>,
      );
    });

    const deleteButton = screen.getByRole('button', { name: /deletebutton/i });

    await act(() => {
      fireEvent.click(deleteButton);
    });

    const noLoginWarning = await screen.findByText(
      'Você precisa estar logado para deletar uma Expression. 🤔',
    );

    expect(noLoginWarning).toBeInTheDocument();
  });

  it('Deve renderizar um erro caso o usuario deslogado clique no botao de favoritar expressão', async () => {
    const expressionsMock: IDBExpression[] = [
      {
        _id: '1',
        expression: 'teste',
        author: 'autor teste',
        deleted: false,
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

    const user = null;
    const setUser = jest.fn();

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <DictionaryDbinclui />
        </AuthContext.Provider>,
      );
    });

    const favoriteButton = screen.getByRole('button', {
      name: /favoritebutton/i,
    });

    await act(() => {
      fireEvent.click(favoriteButton);
    });

    const noLoginWarning = await screen.findByText(
      'Você precisa estar logado para favoritar uma Expression. 🤔',
    );

    expect(noLoginWarning).toBeInTheDocument();
  });
});

it('Deve renderizar um erro caso o usuario deslogado clique no botao de favoritar expressão', async () => {
  const expressionsMock: IDBExpression[] = [
    {
      _id: '1',
      expression: 'teste',
      author: 'autor teste',
      deleted: false,
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

  const user = null;
  const setUser = jest.fn();

  await act(async () => {
    render(
      <AuthContext.Provider value={{ user, setUser }}>
        <DictionaryDbinclui />
      </AuthContext.Provider>,
    );
  });

  const deleteButton = screen.getByRole('button', { name: /deletebutton/i });

  await act(() => {
    fireEvent.click(deleteButton);
  });

  const noLoginWarning = await screen.findByText(
    'Você precisa estar logado para deletar uma Expression. 🤔',
  );

  expect(noLoginWarning).toBeInTheDocument();
});
