import React from 'react';
import { act, getByTestId, render, screen } from '@testing-library/react';
import GuideList from './index';
import { AuthContext } from '@contexts/AuthContext';
import { GuideInterface, getGuides } from '@services/guides';
import { AxiosResponse } from 'axios';
import '@testing-library/jest-dom';

jest.mock('@services/guides');

const getGuidesMock = getGuides as jest.MockedFunction<typeof getGuides>;
const setUser = jest.fn();

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const useHref = jest.fn();
  return {
    useHref,
    useNavigate: () => mockedNavigate,
  };
});

describe('Teste da página de listagem de guias', () => {
  const guideDataMock = {
    _id: '1',
    title: 'Titulo',
    content: 'Conteudo',
    author: { uid: '1' },
    filePaths: {
      filePath: 'image/path',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Deve listar os Guias', async () => {
    getGuidesMock.mockImplementation(
      async () =>
        ({
          data: { data: [] },
        } as unknown as Promise<AxiosResponse<{ data: GuideInterface[] }>>),
    );

    act(() => {
      render(<GuideList />);
    });

    expect(getGuidesMock).toBeCalledTimes(1);
  });

  test('Deve ler o título da página', () => {
    render(<GuideList />);
    const title = screen.getByText('LISTAGEM DE GUIAS');
    expect(title).toBeInTheDocument();
  });

  test('O botão "Novo" deve ser visível para os usuários logados', async () => {
    const user = {
      _id: '1',
      uid: '1',
      photoURL: 'photo/URL',
      displayName: 'user',
      email: 'user@email',
      token: 'token',
      admin: false,
    };

    getGuidesMock.mockImplementation(
      async () =>
        ({
          data: { data: [guideDataMock] },
        } as unknown as Promise<AxiosResponse<{ data: GuideInterface[] }>>),
    );

    await render(
      <AuthContext.Provider value={{ user, setUser }}>
        <GuideList />
      </AuthContext.Provider>,
    );

    const button = await screen.findByText('Novo');
    expect(button).toBeVisible();
  });

  test('O botão "Novo" não deve ser visível para os usuários sem login', async () => {
    const user = null;
    getGuidesMock.mockImplementation(
      async () =>
        ({
          data: { data: [guideDataMock] },
        } as unknown as Promise<AxiosResponse<{ data: GuideInterface[] }>>),
    );

    await render(
      <AuthContext.Provider value={{ user, setUser }}>
        <GuideList />
      </AuthContext.Provider>,
    );

    expect(screen.queryByText('Novo')).not.toBeInTheDocument();
  });

  test('O botão "Excluir" deve ser habilitado para o usuário criador do guia', async () => {
    const user = {
      _id: '1',
      uid: '1',
      photoURL: 'photo/URL',
      displayName: 'user',
      email: 'user@email',
      token: 'token',
      admin: false,
    };
    getGuidesMock.mockImplementation(
      async () =>
        ({
          data: { data: [guideDataMock] },
        } as unknown as Promise<AxiosResponse<{ data: GuideInterface[] }>>),
    );

    await render(
      <AuthContext.Provider value={{ user, setUser }}>
        <GuideList />
      </AuthContext.Provider>,
    );

    const button = await screen.findByTestId('delete');

    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  test('O botão "Excluir" deve ser desabilitado para o usuário que não criou o guia', async () => {
    const user = {
      _id: '2',
      uid: '2',
      photoURL: 'photo/URL',
      displayName: 'user',
      email: 'user@email',
      token: 'token',
      admin: false,
    };
    getGuidesMock.mockImplementation(
      async () =>
        ({
          data: { data: [guideDataMock] },
        } as unknown as Promise<AxiosResponse<{ data: GuideInterface[] }>>),
    );

    await render(
      <AuthContext.Provider value={{ user, setUser }}>
        <GuideList />
      </AuthContext.Provider>,
    );

    const button = await screen.findByTestId('delete');

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test('O botão "Excluir" deve ser habilitado para o usuário adm que não criou o guia', async () => {
    const user = {
      _id: '2',
      uid: '2',
      photoURL: 'photo/URL',
      displayName: 'user',
      email: 'user@email',
      token: 'token',
      admin: false,
    };
    getGuidesMock.mockImplementation(
      async () =>
        ({
          data: { data: [guideDataMock] },
        } as unknown as Promise<AxiosResponse<{ data: GuideInterface[] }>>),
    );

    await render(
      <AuthContext.Provider value={{ user, setUser }}>
        <GuideList />
      </AuthContext.Provider>,
    );

    const button = await screen.findByTestId('delete');

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
