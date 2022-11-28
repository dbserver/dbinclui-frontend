import React from 'react';
import { RegisterDigitalContent } from '@pages/register-digital-content';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';
import validateInput, { InputInterfaceProps } from './validator';
import { postDigitalContent } from '@services/digitalContent';
import { CategoryInterface, getCategoriesByGuide } from '@services/categories';
import { GuideInterface, getGuides } from '@services/guides';
import { AxiosResponse } from 'axios';
import userEvent from '@testing-library/user-event';

jest.mock('./validator');
jest.mock('@services/digitalContent');
jest.mock('@services/categories');
jest.mock('@services/guides');

const validateInputMock = validateInput as jest.MockedFunction<
  typeof validateInput
>;
const getCategoriesByGuideMock = getCategoriesByGuide as jest.MockedFunction<
  typeof getCategoriesByGuide
>;
const getGuidesMock = getGuides as jest.MockedFunction<typeof getGuides>;
const postDigitalContentMock = postDigitalContent as jest.MockedFunction<
  typeof postDigitalContent
>;

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const useHref = jest.fn();
  return {
    useHref,
    useNavigate: () => mockedNavigate,
  };
});

describe('Página de cadastro de categorias', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Deve chamar os guias quando o componente for renderizado', async () => {
    const dataMockMenuItem = [
      {
        _id: 1,
        title: 'teste 1',
        content: 'content 2',
      },
    ];

    getGuidesMock.mockResolvedValue({
      data: {
        data: dataMockMenuItem,
      },
    } as unknown as AxiosResponse<{ data: GuideInterface[] }>);

    render(<RegisterDigitalContent />);

    await waitFor(() => {
      expect(getGuidesMock).toBeCalled();
    });
  });

  test('Deve chamar e mostrar as categorias quando um guia for selecionado', async () => {
    const mockGuides = [
      {
        _id: 1,
        title: 'teste 1',
        content: 'content 2',
      },
    ];

    getGuidesMock.mockResolvedValue({
      data: {
        data: mockGuides,
      },
    } as unknown as AxiosResponse<{ data: GuideInterface[] }>);

    const mockCategories = [
      {
        _id: '1',
        title: 'categoria 1',
        shortDescription: 'categoria descrição 1',
        guide: {} as any,
      },
    ];

    getCategoriesByGuideMock.mockResolvedValue({
      data: {
        data: mockCategories,
      },
    } as unknown as AxiosResponse<{ data: CategoryInterface[] }>);

    render(<RegisterDigitalContent />);

    // show guides dropdown
    const guideSelectLabel = 'Guia:';
    const guideSelect = await screen.findByLabelText(guideSelectLabel, {
      selector: '#guide',
    });
    await userEvent.click(guideSelect);

    // select a guide
    const guideItem = await screen.findByText(mockGuides[0].title);
    await userEvent.click(guideItem);

    expect(getCategoriesByGuideMock).toBeCalledWith(mockGuides[0]._id);

    // show categories dropdown
    const categorySelectLabel = 'Categoria:';
    const categorySelect = await screen.findByLabelText(categorySelectLabel, {
      selector: '#category',
    });
    await userEvent.click(categorySelect);

    const categoryItem = await screen.findByText(mockCategories[0].title);
    expect(categoryItem).toBeVisible();
  });

  test('Deve mostrar na tela o card de notificação de sucesso quando o botão de submit for clicado', async () => {
    render(<RegisterDigitalContent />);

    validateInputMock.mockResolvedValue(true as unknown as InputInterfaceProps);
    postDigitalContentMock.mockResolvedValue(
      true as unknown as Promise<AxiosResponse>,
    );
    const textoNoBotaoSubmit = 'Salvar';
    const NotificationMessage = 'Cadastro realizado com sucesso! ✔';
    const botaoSubmit = screen.getByText(textoNoBotaoSubmit);

    userEvent.click(botaoSubmit);

    const NotificationCard = await screen.findByText(NotificationMessage);

    expect(NotificationCard).toBeVisible();
    expect(validateInputMock).toBeCalled();
    expect(postDigitalContentMock).toBeCalled();
  });

  test('Deve mostrar na tela o card de notificação de erro quando o botão de submit for clicado', async () => {
    render(<RegisterDigitalContent />);

    const errorMessage = 'Erro';
    const throwError = new Error(errorMessage);

    validateInputMock.mockImplementation(() => {
      throw throwError;
    });

    const textoNoBotaoSubmit = 'Salvar';
    const NotificationMessage = errorMessage;
    const botaoSubmit = screen.getByText(textoNoBotaoSubmit);

    userEvent.click(botaoSubmit);

    const NotificationCard = await screen.findByText(NotificationMessage);

    expect(NotificationCard).toBeVisible();
    expect(validateInputMock).toBeCalled();
  });

  test('Deve exibir mensagem de erro ao não encontrar guias', async () => {
    const errorMessage = 'Não foram encontradas as guias';
    const throwError = new Error(errorMessage);
    getGuidesMock.mockImplementation(() => {
      throw throwError;
    });

    render(<RegisterDigitalContent />);

    const ErrorMessage = await screen.findByText(errorMessage);
    expect(ErrorMessage).toBeVisible();
  });

  test('Deve exibir mensagem de erro ao não encontrar categorias', async () => {
    const mockGuide = [
      {
        _id: 1,
        title: 'teste 1',
        content: 'content 2',
      },
    ];

    getGuidesMock.mockResolvedValue({
      data: {
        data: mockGuide,
      },
    } as unknown as AxiosResponse<{ data: GuideInterface[] }>);

    const errorMessageText = 'Não foram encontradas as categorias';
    const throwError = new Error(errorMessageText);
    getCategoriesByGuideMock.mockImplementation(() => {
      throw throwError;
    });

    render(<RegisterDigitalContent />);

    // show dropdown
    const guideSelectLabel = 'Guia:';
    const guideSelect = await screen.findByLabelText(guideSelectLabel, {
      selector: '#guide',
    });
    userEvent.click(guideSelect);

    // select a guide
    const guideItem = await screen.findByText(mockGuide[0].title);
    userEvent.click(guideItem);

    const ErrorMessage = await screen.findByText(errorMessageText);
    expect(ErrorMessage).toBeVisible();
  });

  test('Deve mostrar um formulário', () => {
    render(<RegisterDigitalContent />);

    const textLabelGuide = 'Guia:';
    const textLabelCategory = 'Categoria:';
    const textLabelTitle = 'Título:';
    const textLabelDescription = 'Descrição:';

    const labelGuide = screen.getByText(textLabelGuide);
    const labelCategory = screen.getByText(textLabelCategory);
    const labelTitle = screen.getByText(textLabelTitle);
    const labelDescription = screen.getByText(textLabelDescription);

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

  test('Deve verificar se o formulário foi enviado', () => {
    render(<RegisterDigitalContent />);

    const button = screen.getByTestId('submit');
    fireEvent.click(button);
  });

  test('Deve verificar se o arquivo está sendo enviado', async () => {
    const fileName = 'teste.pdf';

    render(<RegisterDigitalContent />);

    const noFile = screen.getByText('Nenhum arquivo selecionado');
    expect(noFile).toBeVisible();

    const input = screen.getByTestId('inputFile');
    fireEvent.change(input, { target: { files: [{ name: fileName }] } });

    const elementFileName = await screen.findByText(fileName);
    expect(elementFileName).toBeVisible();
    expect(noFile).not.toBeVisible();

    const button = screen.getByTestId('submit');
    fireEvent.click(button);
  });

  test('Deve verificar se o arquivo é excluido quando o botão de exclusão for clicado', async () => {
    const mockFileNames = ['teste.jpg', 'teste.png'];

    render(<RegisterDigitalContent />);

    // add files
    const input = screen.getByTestId('inputFile');
    fireEvent.change(input, {
      target: {
        files: mockFileNames.map((fileName) => ({
          name: fileName,
        })),
      },
    });

    const removeButtonLabel = 'Remover arquivo teste.jpg';
    const removeButton = screen.getByLabelText(removeButtonLabel);

    // check if both files are rendered before deletion
    const elementsFileName = mockFileNames.map((fileName) =>
      screen.getByText(fileName),
    );
    elementsFileName.forEach((element) => {
      expect(element).toBeVisible();
    });

    await userEvent.click(removeButton);

    // here teste.jpg (the removed file) is the second one because for some reason,
    // when we add the files with fireEvent they are added in reverse order 🤷
    expect(elementsFileName[0]).toBeVisible();
    expect(elementsFileName[1]).not.toBeVisible();
  });

  test('Botão Voltar deve redirecionar para admin', () => {
    render(<RegisterDigitalContent />);
    const button = screen.getByTestId('back');

    expect(button).toHaveAttribute('to', '/admin/listar-conteudo-digital');
  });
});
