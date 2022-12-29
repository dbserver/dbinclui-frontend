import React from 'react';
import { act, render, screen } from '@testing-library/react';
import GuideList from './index';
import { AuthContext } from '@contexts/AuthContext';
import { GuideInterface, getGuides } from '@services/guides';
import { AxiosResponse } from 'axios';
import '@testing-library/jest-dom';

jest.mock('@services/guides');

const getGuidesMock = getGuides as jest.MockedFunction<typeof getGuides>;

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
    _id: "1", title: "Titulo",
    content: "Conteudo",
    author: {uid: "1"},
    filePaths: {
      filePath: "image/path"
    }
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

  test('O botão "Novo" deve ser visível para os usuários logados', async() => {
    const user = {
      _id: "1",
      uid: "1",
      photoURL: "photo/URL",
      displayName: "user",
      email: "user@email",
      token: "token",
      admin: false 
    };
    const setUser = jest.fn();

    getGuidesMock.mockImplementation(
      async () =>
        ({
          data: { data: [guideDataMock] },
        } as unknown as Promise<AxiosResponse<{ data: GuideInterface[] }>>),
    );
  
    await render(
      <AuthContext.Provider value={{ user, setUser }}>
        <GuideList />
      </AuthContext.Provider>
    );
    
    const button = await screen.findByText('Novo');
    expect(button).toBeVisible();
  });

  test('O botão "Novo" não deve ser visível para os usuários sem login', async() => {
    const user = null;
    const setUser = jest.fn();

    getGuidesMock.mockImplementation(
      async () =>
        ({
          data: { data: [guideDataMock] },
        } as unknown as Promise<AxiosResponse<{ data: GuideInterface[] }>>),
    );

    await render(
      <AuthContext.Provider value={{ user, setUser }}>
        <GuideList />
      </AuthContext.Provider>
    );
  
    expect(screen.queryByText('Novo')).not.toBeInTheDocument();
  });
});
