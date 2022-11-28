import React from 'react';
import { render, screen } from '@testing-library/react';
import Error404 from './404';
import Error404Contrast from './404';
import { ThemeProvider } from '@mui/material/styles';
import '@testing-library/jest-dom';
import theme from '@styles/theme';

describe('Component 404', () => {
  test('deve existir uma imagem 404', () => {
    expect(Error404).toBeTruthy();
    expect(Error404Contrast).toBeTruthy();
  });

  test('Exibir erro 404 padrão', () => {
    render(
      <ThemeProvider theme={theme('default')}>
        <Error404 />
      </ThemeProvider>,
    );

    expect(screen.getByTitle('Error-404')).toBeInTheDocument();
  });

  test('Exibir erro 404 com contraste', () => {
    render(
      <ThemeProvider theme={theme('contrast')}>
        <Error404Contrast />
      </ThemeProvider>,
    );

    expect(screen.getByTitle('Error-404')).toBeInTheDocument();
  });

  test('deve mostrar mensagem de erro', async () => {
    render(
      <ThemeProvider theme={theme('Error404')}>
        <Error404 data-testid={'messageError'} />
      </ThemeProvider>,
    );
  });
});
