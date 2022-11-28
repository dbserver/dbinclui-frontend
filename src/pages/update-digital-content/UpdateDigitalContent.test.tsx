import React from 'react';
import { UpdateDigitalContent } from '@pages/update-digital-content';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';
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
    act(() => {
      render(<UpdateDigitalContent />);
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
    act(() => {
      render(<UpdateDigitalContent />);
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

});
