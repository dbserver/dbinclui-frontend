import React from 'react';
import {
  render,
  screen,
  act,
  waitFor,
  findByText,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { CategoriesList } from './index';
import '@testing-library/jest-dom/extend-expect';
import {
  CategoryInterface,
  getCategories,
  patchCategories,
} from '@services/categories';
import { AxiosResponse } from 'axios';
import userEvent from '@testing-library/user-event';
import { AuthContext } from '@contexts/AuthContext';

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

const mockPatchCategories = patchCategories as jest.MockedFunction<
  typeof patchCategories
>;

describe('Teste da pagina de listagem de categorias', () => {
  const mockCategory = {
    _id: '1',
    title: 'Título',
    shortDescription: 'uma pequena descrição',
    guide: '1',
    author: { uid: '1' },
  };

  test('Deve exibir o título da página', async () => {
    await act(async () => {
      render(<CategoriesList />);
    });

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

  test('Deve chamar renderizar o modal de confirmação de delete, ao clicar no botão de exclusão da categoria', async () => {
    const user = {
      _id: '1',
      uid: '1',
      photoURL: 'photo/URL',
      displayName: 'user',
      email: 'user@email',
      token: 'token',
      admin: false,
    };

    const setUser = jest.fn();

    getCategoriesMock.mockImplementation(
      async () =>
        ({
          data: { data: [mockCategory] },
        } as unknown as Promise<AxiosResponse<{ data: CategoryInterface[] }>>),
    );

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <CategoriesList />
        </AuthContext.Provider>,
      );
    });

    const button = await screen.findByTestId('delete');

    await act(async () => {
      await userEvent.click(button);
    });

    const deleteModal = await screen.findByText(
      'Deseja excluir essa categoria?',
    );

    await waitFor(() => {
      expect(deleteModal).toBeInTheDocument();
    });
  });

  test('O botão de deletar deve aparecer se o usuário está logado', async () => {
    const user = {
      _id: '1',
      uid: '1',
      photoURL: 'photo/URL',
      displayName: 'user',
      email: 'user@email',
      token: 'token',
      admin: false,
    };

    const setUser = jest.fn();
    getCategoriesMock.mockImplementation(
      async () =>
        ({
          data: { data: [mockCategory] },
        } as unknown as Promise<AxiosResponse<{ data: CategoryInterface[] }>>),
    );

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <CategoriesList />
        </AuthContext.Provider>,
      );
    });

    const button = await screen.findByTestId('delete');

    expect(button).toBeInTheDocument();
  });

  test('O botão de deletar nao deve aparecer se o usuário não está logado', async () => {
    const user = null;

    const setUser = jest.fn();
    getCategoriesMock.mockImplementation(
      async () =>
        ({
          data: { data: [mockCategory] },
        } as unknown as Promise<AxiosResponse<{ data: CategoryInterface[] }>>),
    );

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <CategoriesList />
        </AuthContext.Provider>,
      );
    });

    const button = screen.queryByTestId('delete');

    expect(button).not.toBeInTheDocument();
  });

  test('O botão de deletar categoria, deve ser desabilitado para o usuário que não criou a categoria', async () => {
    const user = {
      _id: '2',
      uid: '2',
      photoURL: 'photo/URL',
      displayName: 'user',
      email: 'user@email',
      token: 'token',
      admin: false,
    };

    const setUser = jest.fn();
    getCategoriesMock.mockImplementation(
      async () =>
        ({
          data: { data: [mockCategory] },
        } as unknown as Promise<AxiosResponse<{ data: CategoryInterface[] }>>),
    );

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <CategoriesList />
        </AuthContext.Provider>,
      );
    });

    const button = await screen.findByTestId('delete');

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test('O botão de editar categoria deve aparecer se o usuário está logado', async () => {
    const user = {
      _id: '1',
      uid: '1',
      photoURL: 'photo/URL',
      displayName: 'user',
      email: 'user@email',
      token: 'token',
      admin: false,
    };

    const setUser = jest.fn();
    getCategoriesMock.mockImplementation(
      async () =>
        ({
          data: { data: [mockCategory] },
        } as unknown as Promise<AxiosResponse<{ data: CategoryInterface[] }>>),
    );

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <CategoriesList />
        </AuthContext.Provider>,
      );
    });

    const button = await screen.findByTestId('edit');

    expect(button).toBeInTheDocument();
  });

  test('O botão de editar categoria não deve aparecer se o não usuário está logado', async () => {
    const user = null;

    const setUser = jest.fn();
    getCategoriesMock.mockImplementation(
      async () =>
        ({
          data: { data: [mockCategory] },
        } as unknown as Promise<AxiosResponse<{ data: CategoryInterface[] }>>),
    );

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <CategoriesList />
        </AuthContext.Provider>,
      );
    });

    const button = screen.queryByTestId('edit');

    expect(button).not.toBeInTheDocument();
  });

  test('O botão "Novo" deve aparecer se o usuário está logado', async () => {
    const user = {
      _id: '1',
      uid: '1',
      photoURL: 'photo/URL',
      displayName: 'user',
      email: 'user@email',
      token: 'token',
      admin: false,
    };

    const setUser = jest.fn();
    getCategoriesMock.mockImplementation(
      async () =>
        ({
          data: { data: [mockCategory] },
        } as unknown as Promise<AxiosResponse<{ data: CategoryInterface[] }>>),
    );

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <CategoriesList />
        </AuthContext.Provider>,
      );
    });

    const button = await screen.findByTestId('new');

    expect(button).toBeInTheDocument();
  });

  test('O botão "Novo" não deve aparecer se o usuário não está logado', async () => {
    const user = null;

    const setUser = jest.fn();
    getCategoriesMock.mockImplementation(
      async () =>
        ({
          data: { data: [mockCategory] },
        } as unknown as Promise<AxiosResponse<{ data: CategoryInterface[] }>>),
    );
    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <CategoriesList />
        </AuthContext.Provider>,
      );
    });

    const button = screen.queryByTestId('new');

    expect(button).not.toBeInTheDocument();
  });
});
