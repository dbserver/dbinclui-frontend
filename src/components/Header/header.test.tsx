import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Header, { MenuItems } from './index';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@styles/theme';

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
    render(
      <ThemeProvider theme={theme('default')}>
        <Header />
      </ThemeProvider>,
    );

    const menuMobile = screen.getByTestId('MenuIcon');
    fireEvent.click(menuMobile);
    const layer = screen.getByRole('presentation');
    expect(layer.getAttribute('aria-hidden')).toBe(null);
    fireEvent.click(menuMobile);
    expect(menuMobile.getAttribute('aria-hidden')).toBe('true');
  });

  test.each(MenuItems)('Desktop menu itens: $title', ({ title, href }) => {
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

  test('Quando o avatar for clicado, o usuário deve ser levado para a página de administração', () => {
    render(
      <ThemeProvider theme={theme('default')}>
        <Header />
      </ThemeProvider>,
    );

    const button = screen.getByLabelText('Administrador');

    fireEvent.click(button);

    expect(mockedNavigate).toBeCalled();
    expect(mockedNavigate).toBeCalledWith('admin');
  });

  it('Exibir a logo default', () => {
    render(
      <ThemeProvider theme={theme('default')}>
        <Header />
      </ThemeProvider>,
    );

    expect(screen.getByTitle('Logo')).toBeInTheDocument();
  });

  it('Exibir a logo com contrast', () => {
    render(
      <ThemeProvider theme={theme('contrast')}>
        <Header />
      </ThemeProvider>,
    );

    expect(screen.getByTitle('Logo')).toBeInTheDocument();
  });
});
