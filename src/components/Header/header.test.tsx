import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Header, { MenuItems } from './index';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@styles/theme';
import { GlobalContext } from '../../contexts/index';
import { googleProviderFunc, firebaseInitialize } from '../../firebase/config';
import firebase from 'firebase/compat/app';
import { act } from 'react-dom/test-utils';

//firebase mock (Provedor, Inicializador)
jest.mock('../../firebase/config');
const mockGoogleProviderFunc = googleProviderFunc as jest.MockedFunction<
  typeof googleProviderFunc
>;

const mockFirebaseInitialize = firebaseInitialize as jest.MockedFunction<
  typeof firebaseInitialize
>;

jest.mock('firebase/compat/app', () => ({
  initializeApp: jest.fn(),
  apps: ['app'],
}));

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const useHref = jest.fn();
  return {
    useHref,
    useNavigate: () => mockedNavigate,
  };
});

describe('Componente Header', () => {
  test('deve mostrar o header', () => {
    expect(Header).toBeTruthy();
  });

  test('Abrir/Fechar menu mobile', () => {
    //mocking user auth in firebase
    mockGoogleProviderFunc.mockImplementation(() => {
      return {} as firebase.auth.GoogleAuthProvider;
    });
    mockFirebaseInitialize.mockReturnValue({
      app: {} as any,
      auth: {
        onIdTokenChanged: jest.fn(),
      } as any,
      googleProvider: jest.fn().mockReturnValue(true),
    });

    render(
      <GlobalContext>
        <ThemeProvider theme={theme('default')}>
          <Header />
        </ThemeProvider>
        ,
      </GlobalContext>,
    );

    const menuMobile = screen.getByTestId('MenuIcon');
    fireEvent.click(menuMobile);
    const layer = screen.getByRole('presentation');
    expect(layer.getAttribute('aria-hidden')).toBe(null);
    fireEvent.click(menuMobile);
    expect(menuMobile.getAttribute('aria-hidden')).toBe('true');
  });

  test.each(MenuItems)('Desktop menu itens: $title', ({ title, href }) => {
    mockGoogleProviderFunc.mockImplementation(() => {
      return {} as firebase.auth.GoogleAuthProvider;
    });
    mockFirebaseInitialize.mockReturnValue({
      app: {} as any,
      auth: {
        onIdTokenChanged: jest.fn(),
      } as any,
      googleProvider: jest.fn().mockReturnValue(true),
    });

    render(
      <ThemeProvider theme={theme('default')}>
        <Header />
      </ThemeProvider>,
    );

    const button = screen.getByTestId(`menu-item-mobile-testid:${title}`);

    expect(button).toHaveTextContent(title);
    expect(button.getAttribute('to')).toBe(href);
    fireEvent.click(button);
  });

  test.each(MenuItems)('Mobile item menu: $title', ({ title, href }) => {
    mockFirebaseInitialize.mockReturnValue({
      app: {} as any,
      auth: {
        onIdTokenChanged: jest.fn(),
      } as any,
      googleProvider: jest.fn().mockReturnValue(true),
    });

    render(
      <ThemeProvider theme={theme('default')}>
        <Header />
      </ThemeProvider>,
    );

    const button = screen.getByTestId(`menu-item-desktop-testid:${title}`);

    expect(button).toHaveTextContent(title);
    expect(button.getAttribute('to')).toBe(href);
    fireEvent.click(button);
  });

  it('Exibir a logo default', () => {
    mockGoogleProviderFunc.mockImplementation(() => {
      return {} as firebase.auth.GoogleAuthProvider;
    });
    mockFirebaseInitialize.mockReturnValue({
      app: {} as any,
      auth: {
        onIdTokenChanged: jest.fn(),
      } as any,
      googleProvider: jest.fn().mockReturnValue(true),
    });

    render(
      <ThemeProvider theme={theme('default')}>
        <Header />
      </ThemeProvider>,
    );

    expect(screen.getByTitle('Logo')).toBeInTheDocument();
  });

  it('Exibir a logo com contrast', () => {
    mockGoogleProviderFunc.mockImplementation(() => {
      return {} as firebase.auth.GoogleAuthProvider;
    });
    mockFirebaseInitialize.mockReturnValue({
      app: {} as any,
      auth: {
        onIdTokenChanged: jest.fn(),
      } as any,
      googleProvider: jest.fn().mockReturnValue(true),
    });

    render(
      <ThemeProvider theme={theme('contrast')}>
        <Header />
      </ThemeProvider>,
    );

    expect(screen.getByTitle('Logo')).toBeInTheDocument();
  });

  test('Botão de ajuda deve ser renderizado', () => {
    render(
      <ThemeProvider theme={theme('contrast')}>
        <Header />
      </ThemeProvider>,
    );

    const helpButton = screen.getByRole('button', {
      name: /botão de ajuda/i,
    });

    expect(helpButton).toBeInTheDocument();
  });

  test('Ao clicar no botão de ajuda, deve abir o modal de ajuda', async () => {
    render(
      <ThemeProvider theme={theme('contrast')}>
        <Header />
      </ThemeProvider>,
    );

    const helpButton = screen.getByRole('button', {
      name: /botão de ajuda/i,
    });

    await act(async () => {
      fireEvent.click(helpButton);
    });

    const helpModal = screen.getByTestId('help-modal');

    await waitFor(() => {
      expect(helpModal).toBeInTheDocument();
    });
  });
});
