import React from 'react';
import { UpdateGuide } from './index';
import { render, screen, waitFor } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import validateInput, { InputInterface } from './validator';
import { getGuideById, putGuides } from '@services/guides';
import { act } from 'react-dom/test-utils';
import { AxiosResponse } from 'axios';

jest.mock('./validator');
jest.mock('@services/guides');

const validateInputMock = validateInput as jest.MockedFunction<
  typeof validateInput
>;

const getGuideByIdMock = getGuideById as jest.MockedFunction<
  typeof getGuideById
>;
const putGuidesMock = putGuides as jest.MockedFunction<typeof putGuides>;

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    useHref: jest.fn(),
    useNavigate: () => mockedNavigate,
    useParams: () => ({
      id: '1',
    }),
  };
});

describe('Página de atualização de guia', () => {
  const mockGuide = {
    id: '1',
    title: 'teste',
    content: 'teste',
  };

  beforeEach(() => {
    getGuideByIdMock.mockResolvedValue({ data: { data: mockGuide } } as any);
  });
  test('Deve mostrar um formulário', async () => {
    render(<UpdateGuide />);

    const textoLabelTitulo = 'Título:';
    const textoLabelDescricao = 'Descrição:';

    const labelTitulo = await screen.findByText(textoLabelTitulo);
    const labelDescricao = await screen.findByText(textoLabelDescricao);

    const input = screen.getByLabelText(textoLabelTitulo, {
      selector: 'input',
    });
    const textArea = screen.getByLabelText(textoLabelDescricao, {
      selector: 'textarea',
    });
    //adicionar mais um const para o guides como select

    expect(labelTitulo).toBeVisible();
    expect(labelDescricao).toBeVisible();
    expect(input).toBeVisible();
    expect(textArea).toBeVisible();

    //label
    //input
  });

  test('Os inputs devem receber o valor dos campos do guia selecionado', async () => {
    render(<UpdateGuide />);

    const textoLabelTitulo = 'Título:';
    const textoLabelDescricao = 'Descrição:';

    const input = await screen.findByLabelText(textoLabelTitulo, {
      selector: 'input',
    });
    const textArea = await screen.findByLabelText(textoLabelDescricao, {
      selector: 'textarea',
    });

    const inputText = 'teste';
    const textAreaText = 'teste';

    await userEvent.type(input, inputText);
    await userEvent.type(textArea, textAreaText);

    expect(input).toHaveValue(inputText);
    expect(textArea).toHaveValue(textAreaText);
  });

  test('Deve atualizar o valor dos campos de input quando o valor destes mudar', async () => {
    render(<UpdateGuide />);

    const textoLabelTitulo = 'Título:';
    const textoLabelDescricao = 'Descrição:';

    const input = await screen.findByLabelText(textoLabelTitulo, {
      selector: 'input',
    });
    const textArea = await screen.findByLabelText(textoLabelDescricao, {
      selector: 'textarea',
    });

    const inputText = ' Esse é o texto presente no elemento input';
    const textAreaText =
      ' Esse é o texto presente no elemento textarea\n Ele aceita novas linhas';

    await userEvent.type(input, inputText);
    await userEvent.type(textArea, textAreaText);

    expect(input).toHaveValue(`${inputText}`);
    expect(textArea).toHaveValue(`${textAreaText}`);
  });

  test('Deve validar o input quando o botão de submit for clicado', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(<UpdateGuide />);
    });

    const textoBotaoSubmit = 'Atualizar';
    const botaoSubmit = await screen.findByText(textoBotaoSubmit);

    await act(() => {
      userEvent.click(botaoSubmit);
    });

    await waitFor(() => {
      expect(validateInputMock).toBeCalled();
    });
  });

  test('Deve chamar a função putGuides quando o botão do submit for clicado', async () => {
    act(() => {
      render(<UpdateGuide />);
    });
    const textoNoBotaoSubmit = 'Atualizar';
    const botaoSubmit = await screen.findByText(textoNoBotaoSubmit);

    await act(() => {
      userEvent.click(botaoSubmit);
    });
    await waitFor(() => {
      expect(putGuidesMock).toBeCalled();
    });
  });

  test('Deve mostrar na tela o card de notificação de sucesso quando o botão de submit for clicado', async () => {
    act(() => {
      render(<UpdateGuide />);
    });

    validateInputMock.mockResolvedValue(true as unknown as InputInterface);
    putGuidesMock.mockResolvedValue(true as unknown as Promise<AxiosResponse>);
    const textoNoBotaoSubmit = 'Atualizar';
    const NotificationMessage = 'Atualização realizada com sucesso! ✔';
    const botaoSubmit = await screen.findByText(textoNoBotaoSubmit);

    await act(() => {
      userEvent.click(botaoSubmit);
    });

    const NotificationCard = await screen.findByText(NotificationMessage);

    expect(NotificationCard).toBeVisible();
  });

  test('Deve mostrar na tela o card de notificação de erro quando o botão de submit for clicado', async () => {
    act(() => {
      render(<UpdateGuide />);
    });

    const errorMessage = 'Erro';
    const throwError = new Error(errorMessage);

    validateInputMock.mockImplementation(() => {
      throw throwError;
    });
    putGuidesMock.mockResolvedValue(true as unknown as Promise<AxiosResponse>);
    const textoNoBotaoSubmit = 'Atualizar';
    const NotificationMessage = errorMessage;
    const botaoSubmit = await screen.findByText(textoNoBotaoSubmit);

    await act(() => {
      userEvent.click(botaoSubmit);
    });

    const NotificationCard = await screen.findByText(NotificationMessage);

    expect(NotificationCard).toBeVisible();
  });

  test('Botão Voltar deve redirecionar para página de listagem', async () => {
    render(<UpdateGuide />);
    const button = await screen.findByTestId('back');

    expect(button).toHaveAttribute('to', '/admin/listar-guias');
  });

  test('Erro na busca dos guias', async () => {
    const errorMessage = 'Erro';
    const throwError = new Error(errorMessage);
    getGuideByIdMock.mockRejectedValue(throwError);

    render(<UpdateGuide />);

    const NotificationCard = await screen.findByText(errorMessage);

    expect(NotificationCard).toBeVisible();
  });

  test('Deve fechar a notificação de erro quando o botão de fechar for clicado', async () => {
    const errorMessage = 'Erro';
    const throwError = new Error(errorMessage);
    getGuideByIdMock.mockRejectedValue(throwError);

    render(<UpdateGuide />);

    const closeButtonText = 'Fechar';
    const closeButton = await screen.findByTitle(closeButtonText);

    const NotificationCard = await screen.findByText(errorMessage);

    await userEvent.click(closeButton);

    expect(NotificationCard).not.toBeVisible();
  });

  test('Deve verificar se o arquivo está sendo enviado', async () => {
    const fileName = 'teste.png';

    render(<UpdateGuide />);

    const noFile = await screen.findByTestId('IndexFileTest');
    expect(noFile).toBeVisible();

    const input = screen.getByTestId('inputFile');
    fireEvent.change(input, { target: { files: [{ name: fileName }] } });

    const elementFileName = await screen.findByText(fileName);
    expect(elementFileName).toBeVisible();
    expect(noFile).not.toBeVisible();
  });

  test('Deve fechar a notificação de sucesso quando o botão de fechar for clicado', async () => {
    act(() => {
      render(<UpdateGuide />);
    });

    validateInputMock.mockResolvedValue(true as unknown as InputInterface);
    putGuidesMock.mockResolvedValue(true as unknown as Promise<AxiosResponse>);
    const textoNoBotaoSubmit = 'Atualizar';
    const NotificationMessage = 'Atualização realizada com sucesso! ✔';
    const botaoSubmit = await screen.findByText(textoNoBotaoSubmit);

    await act(() => {
      userEvent.click(botaoSubmit);
    });

    const NotificationCard = await screen.findByText(NotificationMessage);

    const closeButtonText = 'Fechar';
    const closeButton = await screen.findByTitle(closeButtonText);

    await userEvent.click(closeButton);

    expect(NotificationCard).not.toBeVisible();
  });
});
