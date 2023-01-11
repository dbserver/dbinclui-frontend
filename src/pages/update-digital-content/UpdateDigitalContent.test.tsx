import React from 'react';
import { UpdateDigitalContent } from '@pages/update-digital-content';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import validateInput, { InputInterfaceProps } from './validator';
import {
  getDigitalContentById,
  putDigitalContent,
} from '@services/digitalContent';
import { CategoryInterface, getCategories } from '@services/categories';
import { GuideInterface, getGuides } from '@services/guides';
import { act } from 'react-dom/test-utils';
import { AxiosResponse } from 'axios';
import userEvent from '@testing-library/user-event';
import { AuthContext } from '@contexts/AuthContext';

jest.mock('./validator');
jest.mock('@services/digitalContent');
jest.mock('@services/categories');
jest.mock('@services/guides');

const validateInputMock = validateInput as jest.MockedFunction<
  typeof validateInput
>;
const getCategoryServiceMock = getCategories as jest.MockedFunction<
  typeof getCategories
>;
const getGuidesServiceMock = getGuides as jest.MockedFunction<typeof getGuides>;

const getDigitalContentByIdMock = getDigitalContentById as jest.MockedFunction<
  typeof getDigitalContentById
>;

const putDigitalContentMock = putDigitalContent as jest.MockedFunction<
  typeof putDigitalContent
>;

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const useHref = jest.fn();
  return {
    useHref,
    useNavigate: () => mockedNavigate,
    useParams: () => ({
      id: '1',
    }),
  };
});

describe('Página de atualização de conteúdo', () => {
  const mockDigitalContent = {
    id: '1',
    guide: 'teste',
    category: 'teste',
    title: 'teste',
    content: 'teste',
  };

  const mockDigitalContent1 = {
    _id: '1',
    title: 'Titulo do conteúdo',
    shortDescription: 'oi',
    guide: {
      _id: '6382b82611a630eb7bf0fb7e',
      title: 'Guia de acessibilidade',
      content: 'O guia acessível',
      filePaths: {
        filePath:
          'https://res.cloudinary.com/duxvxgg4t/image/upload/v1669511299/uploads/d2cnonynuogw4b5z7xee.png',
        publicId: 'uploads/d2cnonynuogw4b5z7xee',
      },
    },
    category: {
      _id: '6382b8be11a630eb7bf0fbaf',
      title: 'Categoria de acessibilidade',
      shortDescription: 'descrição da categoria de acessibilidade',
      guide: '6382b82611a630eb7bf0fb7e',
    },
    filePaths: [
      {
        filePath: 'https://localhost/passarinho.png',
        publicId: 'uploads/ra1saywtgnglipikof0p',
        _id: '638e64ffb9180077c5c957f1',
      },
    ],
  };

  beforeEach(() => {
    getDigitalContentByIdMock.mockResolvedValue({
      data: { data: mockDigitalContent },
    } as any);
  });

  test('Deve chamar os guias quando o componente for renderizado', async () => {
    const dataMockMenuItem = [
      {
        _id: 1,
        title: 'teste 1',
        content: 'content 2',
      },
    ];

    getGuidesServiceMock.mockResolvedValue({
      data: {
        data: dataMockMenuItem,
      },
    } as unknown as AxiosResponse<{ data: GuideInterface[] }>);

    act(() => {
      render(<UpdateDigitalContent />);
    });

    await waitFor(() => {
      expect(getGuidesServiceMock).toBeCalled();
    });
  });

  test('Deve chamar as categorias quando o componente for renderizado', async () => {
    const dataMockMenuItem = [
      {
        _id: 1,
        guide: '1',
        title: 'teste',
        content: 'content',
      },
    ];

    getCategoryServiceMock.mockResolvedValue({
      data: {
        data: dataMockMenuItem,
      },
    } as unknown as AxiosResponse<{ data: CategoryInterface[] }>);

    act(() => {
      render(<UpdateDigitalContent />);
    });

    await waitFor(() => {
      expect(getCategoryServiceMock).toBe(getCategoryServiceMock);
    });
  });

  test('Deve mostrar um formulário', async () => {
    render(<UpdateDigitalContent />);

    const textLabelGuide = 'Guia:';
    const textLabelCategory = 'Categoria:';
    const textLabelTitle = 'Título:';
    const textLabelDescription = 'Descrição:';

    const labelGuide = await screen.findByText(textLabelGuide);
    const labelCategory = await screen.findByText(textLabelCategory);
    const labelTitle = await screen.findByText(textLabelTitle);
    const labelDescription = await screen.findByText(textLabelDescription);

    const title = screen.getByLabelText(textLabelTitle, {
      selector: 'input',
    });
    const textArea = screen.getByLabelText(textLabelDescription, {
      selector: 'textarea',
    });

    expect(labelDescription).toBeVisible();
    expect(labelCategory).toBeVisible();
    expect(labelGuide).toBeVisible();
    expect(labelTitle).toBeVisible();
    expect(title).toBeVisible();
    expect(textArea).toBeVisible();
  });

  test('Deve mostrar na tela o card de notificação de sucesso quando o botão de submit for clicado', async () => {
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
          <UpdateDigitalContent />
        </AuthContext.Provider>,
      );
    });

    validateInputMock.mockResolvedValue(true as unknown as InputInterfaceProps);
    putDigitalContentMock.mockResolvedValue(
      true as unknown as Promise<AxiosResponse>,
    );
    const textoNoBotaoSubmit = 'Atualizar';
    const NotificationMessage = 'Atualização realizada com sucesso! ✔';
    const botaoSubmit = await screen.findByText(textoNoBotaoSubmit);

    act(() => {
      userEvent.click(botaoSubmit);
    });

    const NotificationCard = await screen.findByText(NotificationMessage);

    expect(NotificationCard).toBeVisible();
    expect(validateInputMock).toBeCalled();
    expect(putDigitalContentMock).toBeCalled();
  });

  test('Deve mostrar na tela o card de notificação de erro quando o botão de submit for clicado', async () => {
    act(() => {
      render(<UpdateDigitalContent />);
    });

    const errorMessage = 'Erro';
    const throwError = new Error(errorMessage);

    validateInputMock.mockImplementation(() => {
      throw throwError;
    });

    const textoNoBotaoSubmit = 'Atualizar';
    const NotificationMessage = errorMessage;
    const botaoSubmit = await screen.findByText(textoNoBotaoSubmit);

    act(() => {
      userEvent.click(botaoSubmit);
    });

    const NotificationCard = await screen.findByText(NotificationMessage);

    expect(NotificationCard).toBeVisible();
    expect(validateInputMock).toBeCalled();
  });

  test('Deve exibir mensagem de erro ao não encontrar guias', async () => {
    getGuidesServiceMock.mockImplementation(() => {
      throw throwError;
    });

    act(() => {
      render(<UpdateDigitalContent />);
    });

    const errorMessage = 'Não foram encontradas as guias';
    const throwError = new Error(errorMessage);

    const ErrorMessage = await screen.findByText(errorMessage);
    expect(ErrorMessage).toBeVisible();
  });

  test('Deve exibir mensagem de erro ao não encontrar categorias', async () => {
    getCategoryServiceMock.mockImplementation(() => {
      throw throwError;
    });

    act(() => {
      render(<UpdateDigitalContent />);
    });

    const errorMessage = 'Não foram encontradas as categorias';
    const throwError = new Error(errorMessage);

    const ErrorMessage = await screen.findByText(errorMessage);
    expect(ErrorMessage).toBeVisible();
  });

  test('Deve chamar a função putDigitalContent quando o botão do submit for clicado', async () => {
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
          <UpdateDigitalContent />
        </AuthContext.Provider>,
      );
    });
    const textoNoBotaoSubmit = 'Atualizar';
    const botaoSubmit = await screen.findByText(textoNoBotaoSubmit);

    act(() => {
      userEvent.click(botaoSubmit);
    });
    await waitFor(() => {
      expect(putDigitalContentMock).toBeCalled();
    });
  });

  test('Deve verificar se o arquivo está sendo enviado', async () => {
    const fileName = 'teste.pdf';

    render(<UpdateDigitalContent />);

    global.URL.createObjectURL = jest.fn();

    const noFile = screen.getByText('Nenhum arquivo selecionado');
    expect(noFile).toBeVisible();

    const input = screen.getByTestId('inputFile');
    fireEvent.change(input, { target: { files: [{ name: fileName }] } });

    const elementFileName = await screen.findByText(fileName);
    expect(elementFileName).toBeVisible();
    expect(noFile).not.toBeVisible();
  });

  test('Botão Voltar deve redirecionar para a página de listagem', async () => {
    render(<UpdateDigitalContent />);
    const button = await screen.findByTestId('back');

    expect(button).toHaveAttribute('to', '/admin/listar-conteudo-digital');
  });

  test('Deve verificar se a mídia é visível e se o src da mídia seja o mesmo da entidade', async () => {
    getDigitalContentByIdMock.mockClear();
    getDigitalContentByIdMock.mockResolvedValue({
      data: { data: mockDigitalContent1 },
    } as any);

    await act(() => {
      render(<UpdateDigitalContent />);
    });

    const media = screen.getByRole('media');
    const imageViewElement = screen.getByLabelText(
      'media do conteúdo digital',
    ) as HTMLImageElement;

    expect(media).toBeVisible();
    expect(imageViewElement.src).toBe('https://localhost/passarinho.png');
  });

  test('Espera que ao inserir nova mídia o seu src seja o mesmo da entidade', async () => {
    getDigitalContentByIdMock.mockClear();
    getDigitalContentByIdMock.mockResolvedValue({
      data: { data: mockDigitalContent1 },
    } as any);

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    global.URL.createObjectURL = jest.fn(() => 'blob:www.localhost/hello.png');

    await act(() => {
      render(<UpdateDigitalContent />);
    });

    const input = screen.getByTestId('inputFile') as HTMLInputElement;
    await userEvent.upload(input, file);

    const imageViewElement = screen.getByLabelText(
      'media do conteúdo digital',
    ) as HTMLImageElement;

    expect(imageViewElement.src).toBe('blob:www.localhost/hello.png');
  });

  test('Espera que o botão excluir mídia remova a nova mídia e exiba a mídia original', async () => {
    getDigitalContentByIdMock.mockClear();
    getDigitalContentByIdMock.mockResolvedValue({
      data: { data: mockDigitalContent1 },
    } as any);

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    global.URL.createObjectURL = jest.fn(() => 'blob:www.localhost/hello.png');

    await act(() => {
      render(<UpdateDigitalContent />);
    });

    const input = screen.getByTestId('inputFile') as HTMLInputElement;
    await userEvent.upload(input, file);

    const button = screen.getByLabelText('botão excluir');
    await userEvent.click(button);
    const imageViewElement = screen.getByLabelText(
      'media do conteúdo digital',
    ) as HTMLImageElement;

    expect(imageViewElement.src).not.toBe('blob:www.localhost/hello.png');
    expect(imageViewElement.src).toBe('https://localhost/passarinho.png');
  });
});
