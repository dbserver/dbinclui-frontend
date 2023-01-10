import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { AxiosResponse } from 'axios';

import { DictionaryDbinclui } from './index';

import { getDbExpression } from '@services/dbExpressions';
import { IDBExpression } from '@interfaces/IDBExpression';

import { AuthContext } from '../../contexts/AuthContext';
import { ItemList } from '@components/CardExpression/ItemList';
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
  it('Se o usuario não estiver logado o clique do button favorite chama o erro ', async () => {
    const user = null;
    const setUser = jest.fn();

    const handleFavoriteExpressionMock = jest.fn();
    const handleDeleteExpressionMock = jest.fn();

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <DictionaryDbinclui />
        </AuthContext.Provider>,
      );
    });

    const buttonFavorite = screen.getByRole('button', {
      name: /favoritebutton/i,
    });
    const buttonDelete = screen.getByRole('button', { name: /deletebutton/i });

    fireEvent.click(buttonFavorite);
  });
});
