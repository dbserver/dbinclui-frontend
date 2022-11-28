import React from 'react';
import RegisterGuide from './index';
import { render, screen, waitFor } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import validateInput, { InputInterface } from './validator';
import { postGuides } from '@services/guides';
import { act } from 'react-dom/test-utils';
import { AxiosResponse } from 'axios';

jest.mock('./validator');
jest.mock('@services/guides');
const validateInputMock = validateInput as jest.MockedFunction<
  typeof validateInput
>;
const postGuidesMock = postGuides as jest.MockedFunction<typeof postGuides>;

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const useHref = jest.fn();
  return {
    useHref,
    useNavigate: () => mockedNavigate,
  };
});

describe('Página de cadastro de nova guia', () => {
  test('Deve mostrar um formulário', () => {
    render(<RegisterGuide />);

    const textoLabelTitulo = 'Título:';
    const textoLabelDescricao = 'Descrição:';

    const labelTitulo = screen.getByText(textoLabelTitulo);
    const labelDescricao = screen.getByText(textoLabelDescricao);
    //adicionar campos guides

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

  test('Deve atualizar o valor dos campos de input quando o valor destes mudar', async () => {
    render(<RegisterGuide />);

    const textoLabelTitulo = 'Título:';
    const textoLabelDescricao = 'Descrição:';

    const input = screen.getByLabelText(textoLabelTitulo, {
      selector: 'input',
    });
    const textArea = screen.getByLabelText(textoLabelDescricao, {
      selector: 'textarea',
    });

    const inputText = 'Esse é o texto presente no elemento input';
    const textAreaText =
      'Esse é o texto presente no elemento textarea\n Ele aceita novas linhas';

    await userEvent.type(input, inputText);
    await userEvent.type(textArea, textAreaText);

    expect(input).toHaveValue(inputText);
    expect(textArea).toHaveValue(textAreaText);
  });

  test('Deve validar o input quando o botão de submit for clicado', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(<RegisterGuide />);
    });

    const textoBotaoSubmit = 'Salvar';
    const botaoSubmit = screen.getByText(textoBotaoSubmit);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(botaoSubmit);
    });

    await waitFor(() => {
      expect(validateInputMock).toBeCalled();
    });
  });

  test('Deve chamar a função postGuides quando o botão do submit for clicado', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(<RegisterGuide />);
    });
    const textoNoBotaoSubmit = 'Salvar';
    const botaoSubmit = screen.getByText(textoNoBotaoSubmit);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(botaoSubmit);
    });
    await waitFor(() => {
      expect(postGuidesMock).toBeCalled();
    });
  });

  test('Deve mostrar na tela o card de notificação de sucesso quando o botão de submit for clicado', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(<RegisterGuide />);
    });

    validateInputMock.mockResolvedValue(true as unknown as InputInterface);
    postGuidesMock.mockResolvedValue(true as unknown as Promise<AxiosResponse>);
    const textoNoBotaoSubmit = 'Salvar';
    const NotificationMessage = 'Cadastro realizado com sucesso! ✔';
    const botaoSubmit = screen.getByText(textoNoBotaoSubmit);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.click(botaoSubmit);
    });

    const NotificationCard = await screen.findByText(NotificationMessage);

    expect(NotificationCard).toBeVisible();
  });

  test('Deve mostrar na tela o card de notificação de erro quando o botão de submit for clicado', async () => {
    act(() => {
      render(<RegisterGuide />);
    });

    const errorMessage = 'Erro';
    const throwError = new Error(errorMessage);

    validateInputMock.mockImplementation(() => {
      throw throwError;
    });
    postGuidesMock.mockResolvedValue(true as unknown as Promise<AxiosResponse>);
    const textoNoBotaoSubmit = 'Salvar';
    const NotificationMessage = errorMessage;
    const botaoSubmit = screen.getByText(textoNoBotaoSubmit);

    act(() => {
      userEvent.click(botaoSubmit);
    });

    const NotificationCard = await screen.findByText(NotificationMessage);

    expect(NotificationCard).toBeVisible();
  });
});

test('Deve verificar se o arquivo está sendo enviado', async () => {
  const fileName = 'teste.png';

  render(<RegisterGuide />);

  const noFile = screen.getByText('Nenhum arquivo selecionado');
  expect(noFile).toBeVisible();

  const input = screen.getByTestId('inputFile');
  fireEvent.change(input, { target: { files: [{ name: fileName }] } });

  const elementFileName = await screen.findByText(fileName);
  expect(elementFileName).toBeVisible();
  expect(noFile).not.toBeVisible();

  const button = screen.getByText('Salvar');
  fireEvent.click(button);
});

test('Deve verificar se o arquivo é excluido quando o botão de exclusão for clicado', async () => {
  const fileName = 'teste.jpg';

  render(<RegisterGuide />);

  const input = screen.getByTestId('inputFile');
  fireEvent.change(input, { target: { files: [{ name: fileName }] } });

  const removeButtonLabel = 'Remover arquivo teste.jpg';
  const removeButton = screen.getByLabelText(removeButtonLabel);

  const elementsFileName = screen.getByText(fileName);

  expect(elementsFileName).toBeVisible();

  await userEvent.click(removeButton);
  expect(elementsFileName).not.toBeVisible();
});

test('Botão Voltar deve redirecionar para admin', () => {
  render(<RegisterGuide />);
  const button = screen.getByTestId('back');

  expect(button).toHaveAttribute('to', '/admin/listar-guias');
});
