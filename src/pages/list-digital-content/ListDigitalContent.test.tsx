import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ListDigitalContent } from './index';
import '@testing-library/jest-dom/extend-expect';
import {
  DigitalContentInterface,
  getDigitalContent,
} from '@services/digitalContent';
import { AxiosResponse } from 'axios';
import userEvent from '@testing-library/user-event';
import { AuthContext } from '@contexts/AuthContext';
import React from 'react';

jest.mock('@services/digitalContent');

jest.mock('react-router-dom', () => {
  const useNavigate = jest.fn();
  return {
    useNavigate,
  };
});

const getDigitalContentMock = getDigitalContent as jest.MockedFunction<
  typeof getDigitalContent
>;

describe('Teste do componente', () => {
  const dataMockDigitalContent = [
    {
      _id: 'a1',
      shortDescription: 'Categoria1',
      title: 'Titulo1',
      guide: {
        _id: 'a1',
        content: 'Teste',
        title: 'Teste',
        filePaths: {
          filePath: 'www.qualquercoisa.com',
          publicId: 'qualquercoisa',
        },
      },
      category: {
        _id: 'a1',
        title: 'Categoria',
        shortDescription: 'Categoria',
        guide: {
          _id: 'a1',
          content: 'Teste',
          title: 'Maçã1',
          filePaths: {
            filePath: 'www.qualquercoisa.com',
            publicId: 'qualquercoisa',
          },
        },
      },
      filePaths: [
        {
          filePath:
            'https://res.cloudinary.com/duxvxgg4t/image/upload/v1669992224/uploads/ytk8mbjdaptazismwx12.jpg',
          publicId: 'uploads/ytk8mbjdaptazismwx12',
          _id: 'a1',
        },
      ],
      author: {
        _id: '1',
        uid: '1',
        photoURL: 'photo/URL',
        displayName: 'user',
        email: 'user@email',
        token: 'token',
        admin: false,
      },
    },
    {
      _id: 'a2',
      shortDescription: 'Categoria2',
      title: 'Titulo2',
      guide: {
        _id: 'a2',
        content: 'Teste',
        title: 'Teste',
        filePaths: {
          filePath: 'www.qualquercoisa.com',
          publicId: 'qualquercoisa',
        },
      },
      category: {
        _id: 'a1',
        title: 'Categoria',
        shortDescription: 'Categoria',
        guide: {
          _id: 'a1',
          content: 'Teste',
          title: 'Maçã1',
          filePaths: {
            filePath: 'www.qualquercoisa.com',
            publicId: 'qualquercoisa',
          },
        },
      },
      filePaths: [
        {
          filePath:
            'https://res.cloudinary.com/duxvxgg4t/image/upload/v1669992224/uploads/ytk8mbjdaptazismwx12.jpg',
          publicId: 'uploads/ytk8mbjdaptazismwx12',
          _id: 'a1',
        },
      ],
      author: {
        _id: '2',
        uid: '2',
        photoURL: 'photo/URL',
        displayName: 'user2',
        email: 'user2@email',
        token: 'token',
        admin: false,
      },
    },
    {
      _id: 'a3',
      shortDescription: 'Descrição3',
      title: 'Titulo3',
      guide: {
        _id: 'a3',
        content: 'Teste',
        title: 'Teste',
        filePaths: {
          filePath: 'www.qualquercoisa.com',
          publicId: 'qualquercoisa',
        },
      },
      category: {
        _id: 'a3',
        title: 'Categoria3',
        shortDescription: 'Categoria3',
        guide: {
          _id: 'a3',
          content: 'Teste3',
          title: 'Maçã3',
          filePaths: {
            filePath: 'www.qualquercoisa.com',
            publicId: 'qualquercoisa',
          },
        },
      },
      filePaths: [
        {
          filePath:
            'https://res.cloudinary.com/duxvxgg4t/image/upload/v1669992224/uploads/ytk8mbjdaptazismwx12.jpg',
          publicId: 'uploads/ytk8mbjdaptazismwx12',
          _id: 'a3',
        },
      ],
      author: {
        _id: '3',
        uid: '3',
        photoURL: 'photo/URL',
        displayName: 'user3',
        email: 'user3@email',
        token: 'token',
        admin: false,
      },
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Deve exibir o título da página', async () => {
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

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <ListDigitalContent />
        </AuthContext.Provider>,
      );
    });
    const pageTitle = 'LISTAGEM DE CONTEÚDO DIGITAL';
    const textTitle = screen.getByText(pageTitle);
    expect(textTitle).toBeVisible();
  });

  test('Deve listar os conteúdos digitais', async () => {
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

    getDigitalContentMock.mockImplementation(
      async () =>
        ({
          data: { data: [] },
        } as unknown as Promise<
          AxiosResponse<{ data: DigitalContentInterface[] }>
        >),
    );

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <ListDigitalContent />
        </AuthContext.Provider>,
      );
    });

    expect(getDigitalContentMock).toBeCalledTimes(1);
  });

  test('Validar se a opção de visualizar conteudo digital existe na tela', async () => {
    const user = null;

    const setUser = jest.fn();

    getDigitalContentMock.mockImplementation(
      async () =>
        ({
          data: { data: [dataMockDigitalContent[0]] },
        } as unknown as Promise<
          AxiosResponse<{ data: DigitalContentInterface[] }>
        >),
    );
    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <ListDigitalContent />
        </AuthContext.Provider>,
      );
    });
    const viewButton = await screen.findByTestId('view');

    expect(viewButton).toBeInTheDocument();
  });

  test('Botão visualizar deve redirecionar para página de visualização', async () => {
    const user = null;

    const setUser = jest.fn();

    getDigitalContentMock.mockImplementation(
      async () =>
        ({
          data: { data: [dataMockDigitalContent[0]] },
        } as unknown as Promise<
          AxiosResponse<{ data: DigitalContentInterface[] }>
        >),
    );

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <ListDigitalContent />
        </AuthContext.Provider>,
      );
    });

    const viewButton = await screen.findByTestId('view');

    expect(viewButton).toHaveAttribute(
      'href',
      '/admin/visualizar-conteudo-digital/' + dataMockDigitalContent[0]._id,
    );
  });

  test('Verificar se a barra de pesquisa está recebendo o que usuário digita', async () => {
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

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <ListDigitalContent />
        </AuthContext.Provider>,
      );
    });

    const searchInput = screen.getByRole('textbox');

    await act(async () => {
      await userEvent.type(searchInput, 'Valor digitado');
    });

    expect(searchInput).toHaveValue('Valor digitado');
  });

  test('Verifica se o componente digitado na barra de busca está sendo exibido na listagem corretamente', async () => {
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

    getDigitalContentMock.mockImplementation(
      async () =>
        ({
          data: { data: dataMockDigitalContent },
        } as unknown as Promise<
          AxiosResponse<{ data: DigitalContentInterface[] }>
        >),
    );

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <ListDigitalContent />
        </AuthContext.Provider>,
      );
    });
    const searchInput = screen.getByRole('textbox');

    await act(async () => {
      await userEvent.type(searchInput, 'Titulo2');
    });

    const searchButton = screen.getByTestId('search-button');

    await act(async () => {
      await userEvent.click(searchButton);
    });

    const queryResult = screen.queryByText('Titulo2');

    expect(searchInput).toHaveValue('Titulo2');

    expect(queryResult).toBeInTheDocument();
  });

  test('Se o usuário digitar uma descrição inexistente, não deve retornar nenhum conteúdo digital', async () => {
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

    getDigitalContentMock.mockImplementation(
      async () =>
        ({
          data: { data: dataMockDigitalContent[0] },
        } as unknown as Promise<
          AxiosResponse<{ data: DigitalContentInterface[] }>
        >),
    );

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <ListDigitalContent />
        </AuthContext.Provider>,
      );
    });
    const searchInput = screen.getByRole('textbox');

    await act(async () => {
      await userEvent.type(searchInput, 'Descrição Inexistente');
    });

    const searchButton = screen.getByTestId('search-button');

    await act(async () => {
      await userEvent.click(searchButton);
    });

    const queryResult = screen.queryByText('Categoria1');

    expect(searchInput).toHaveValue('Descrição Inexistente');

    expect(queryResult).not.toBeInTheDocument();
  });

  test('O botão de deletar deve ser rederizado caso o usuário esteja logado', async () => {
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

    getDigitalContentMock.mockImplementation(
      async () =>
        ({
          data: { data: [dataMockDigitalContent[0]] },
        } as unknown as Promise<
          AxiosResponse<{ data: DigitalContentInterface[] }>
        >),
    );

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <ListDigitalContent />
        </AuthContext.Provider>,
      );
    });

    const deleteButton = await screen.findByTestId('delete');

    expect(deleteButton).toBeInTheDocument();
  });

  test('O botão de deletar não deve ser rederizado caso o usuário não esteja logado', async () => {
    const user = null;

    const setUser = jest.fn();

    getDigitalContentMock.mockImplementation(
      async () =>
        ({
          data: { data: [dataMockDigitalContent[0]] },
        } as unknown as Promise<
          AxiosResponse<{ data: DigitalContentInterface[] }>
        >),
    );

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <ListDigitalContent />
        </AuthContext.Provider>,
      );
    });

    const deleteButton = screen.queryByTestId('delete');

    expect(deleteButton).not.toBeInTheDocument();
  });

  test('O botão de deletar não deve ser habilitado para o usuário que não criou o guia', async () => {
    const user = {
      _id: '2',
      uid: '2',
      photoURL: 'photo/URL',
      displayName: 'user2',
      email: 'user2@email',
      token: 'token',
      admin: false,
    };

    const setUser = jest.fn();

    getDigitalContentMock.mockImplementation(
      async () =>
        ({
          data: { data: [dataMockDigitalContent[0]] },
        } as unknown as Promise<
          AxiosResponse<{ data: DigitalContentInterface[] }>
        >),
    );
    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <ListDigitalContent />
        </AuthContext.Provider>,
      );
    });

    const deleteButton = await screen.findByTestId('delete');

    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toBeDisabled();
  });

  test('O botão de editar conteudo digital deve ser renderizado se o usuário está logado', async () => {
    const user = {
      _id: '1',
      uid: '1',
      photoURL: 'photo/URL',
      displayName: 'user1',
      email: 'user1@email',
      token: 'token',
      admin: false,
    };

    const setUser = jest.fn();

    getDigitalContentMock.mockImplementation(
      async () =>
        ({
          data: { data: [dataMockDigitalContent[0]] },
        } as unknown as Promise<
          AxiosResponse<{ data: DigitalContentInterface[] }>
        >),
    );

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <ListDigitalContent />
        </AuthContext.Provider>,
      );
    });

    const editButton = await screen.findByTestId('edit');

    expect(editButton).toBeInTheDocument();
  });

  test('O botão de editar conteudo digital não deve ser renderizado se o usuário não está logado', async () => {
    const user = null;

    const setUser = jest.fn();

    getDigitalContentMock.mockImplementation(
      async () =>
        ({
          data: { data: [dataMockDigitalContent[0]] },
        } as unknown as Promise<
          AxiosResponse<{ data: DigitalContentInterface[] }>
        >),
    );
    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <ListDigitalContent />
        </AuthContext.Provider>,
      );
    });

    const editButton = screen.queryByTestId('edit');

    expect(editButton).not.toBeInTheDocument();
  });

  test('O botão "Novo" deve ser renderizado caso o usuário esteja logado', async () => {
    const user = {
      _id: '1',
      uid: '1',
      photoURL: 'photo/URL',
      displayName: 'user1',
      email: 'user1@email',
      token: 'token',
      admin: false,
    };

    const setUser = jest.fn();

    getDigitalContentMock.mockImplementation(
      async () =>
        ({
          data: { data: [dataMockDigitalContent[0]] },
        } as unknown as Promise<
          AxiosResponse<{ data: DigitalContentInterface[] }>
        >),
    );

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <ListDigitalContent />
        </AuthContext.Provider>,
      );
    });

    const newDigitalContentButton = await screen.findByTestId('new');

    expect(newDigitalContentButton).toBeInTheDocument();

    expect(newDigitalContentButton).toHaveAttribute(
      'to',
      '/admin/cadastrar-conteudo-digital',
    );
  });

  test('O botão "Novo" não deve ser renderizado caso o usuário não esteja logado', async () => {
    const user = null;

    const setUser = jest.fn();

    getDigitalContentMock.mockImplementation(
      async () =>
        ({
          data: { data: [dataMockDigitalContent[0]] },
        } as unknown as Promise<
          AxiosResponse<{ data: DigitalContentInterface[] }>
        >),
    );

    await act(async () => {
      render(
        <AuthContext.Provider value={{ user, setUser }}>
          <ListDigitalContent />
        </AuthContext.Provider>,
      );
    });

    const newDigitalContentButton = screen.queryByTestId('new');

    expect(newDigitalContentButton).not.toBeInTheDocument();
  });

  test('Se o usuário digitar um Título inexistente, não deve retornar nenhum conteúdo digital', async () => {
    getDigitalContentMock.mockImplementation(
      async () =>
        ({
          data: { data: [dataMockDigitalContent[0]] },
        } as unknown as Promise<
          AxiosResponse<{ data: DigitalContentInterface[] }>
        >),
    );

    await act(async () => {
      render(<ListDigitalContent />);
    });
    const searchInput = screen.getByRole('textbox');

    await act(async () => {
      await userEvent.type(searchInput, 'Título Inexistente');
    });

    const searchButton = screen.getByTestId('search-button');

    await act(async () => {
      await userEvent.click(searchButton);
    });

    const queryResult = screen.queryByText('Titulo1');

    expect(searchInput).toHaveValue('Título Inexistente');

    expect(queryResult).not.toBeInTheDocument();
  });
});
