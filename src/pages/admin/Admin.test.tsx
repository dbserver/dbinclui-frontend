import React from 'react';
import Admin from '.';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const actualReactRouter = jest.requireActual('react-router-dom');
  return {
    ...actualReactRouter,
    useNavigate: () => mockedNavigate,
  };
});

describe('Página do Administrador', () => {
  /*
  test('Deve mostrar os botões de criação de guias', () => {
    render(<Admin />);

    const buttonRegisterGuideText = 'Administar Guia';
    const buttonRegisterCategoryText = 'Administrar Categorias';
    const buttonRegisterContentText = 'Administrar Conteúdo Digital';

    const buttonRegisterGuide = screen.getByText(buttonRegisterGuideText);
    const buttonRegisterCategory = screen.getByText(buttonRegisterCategoryText);
    const buttonRegisterContent = screen.getByText(buttonRegisterContentText);

    expect(buttonRegisterGuide).toBeTruthy();
    expect(buttonRegisterCategory).toBeTruthy();
    expect(buttonRegisterContent).toBeTruthy();
  });
*/
  test('O botão Administrar Guia deve redirecionar o user para outra página', () => {
    render(<Admin />);

    const buttonRegisterGuideText = 'Administrar Guia';
    const buttonRegisterGuide = screen.getByText(buttonRegisterGuideText);

    userEvent.click(buttonRegisterGuide);

    waitFor(() => {
      expect(mockedNavigate).toBeCalled();
      expect(mockedNavigate).toBeCalledWith('listar-guias');
    });
  });

  test('O botão Administrar Categorias deve redirecionar o user para outra página', () => {
    render(<Admin />);

    const buttonRegisterCategoryText = 'Administrar Categorias';
    const buttonRegisterCategory = screen.getByText(buttonRegisterCategoryText);

    userEvent.click(buttonRegisterCategory);

    waitFor(() => {
      expect(mockedNavigate).toBeCalled();
      expect(mockedNavigate).toBeCalledWith('listar-categorias');
    });
  });

  test('O botão Cadastro de Conteúdo digital deve redirecionar o user para outra página', () => {
    render(<Admin />);

    const buttonRegisterContentText = 'Administrar Conteúdo Digital';
    const buttonRegisterContent = screen.getByText(buttonRegisterContentText);

    userEvent.click(buttonRegisterContent);

    waitFor(() => {
      expect(mockedNavigate).toBeCalled();
      expect(mockedNavigate).toBeCalledWith('listar-conteudo-digital');
    });
  });
});
