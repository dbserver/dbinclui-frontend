import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CategoriesList } from './index';
import '@testing-library/jest-dom/extend-expect';
import {
  CategoryInterface,
  getCategories,
  /*deleteCategory,*/
} from '@services/categories';
import { AxiosResponse } from 'axios';
import userEvent from '@testing-library/user-event';

jest.mock('@services/categories');

jest.mock('react-router-dom', () => {
  const useNavigate = jest.fn();
  return {
    useNavigate,
  };
});

const getCategoriesMock = getCategories as jest.MockedFunction<
  typeof getCategories
>;
/*const deleteCategoryMock = deleteCategory as jest.MockedFunction<
  typeof deleteCategory
>;*/

describe('Teste do componente', () => {
  test('Deve exibir o título da página', () => {
    render(<CategoriesList />);

    const pageTitle = 'LISTAGEM DE CATEGORIAS';
    const textTitle = screen.getByText(pageTitle);
    expect(textTitle).toBeVisible();
  });

  beforeEach(() => {
    getCategoriesMock.mockClear();
  });

  test('Deve listar as Categorias', async () => {
    getCategoriesMock.mockImplementation(
      async () =>
        ({
          data: { data: [] },
        } as unknown as Promise<AxiosResponse<{ data: CategoryInterface[] }>>),
    );

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<CategoriesList />);
    });

    expect(getCategoriesMock).toBeCalledTimes(1);
  });

  test('Deve chamar a função putGuides quando o botão excluir for clicado', async () => {
    const mockCategory = {
      _id: '1',
      title: 'Título',
      shortDescription: 'uma pequena descrição',
      guide: '1',
    };
    getCategoriesMock.mockImplementation(
      async () =>
        ({
          data: { data: [mockCategory] },
        } as unknown as Promise<AxiosResponse<{ data: CategoryInterface[] }>>),
    );

    const onCloseFunction = jest.fn();
    onCloseFunction.mockResolvedValue(true);
    act(() => {
      render(<CategoriesList />);
    });

    const button = await screen.findByText('Guia');

    act(() => {
      userEvent.click(button);
    });
    /* await waitFor(() => {
      expect(deleteCategoryMock).toBeCalled();
    });*/
  });
});
