import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AccessibilityTools from './index';
import { fireEvent } from '@testing-library/dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@styles/theme';

describe('AccessibilityTools Component', () => {
  const handleClick = () => true;
  it('AccessibilityTools: Botão de acessibilidade deve ser exibido', () => {
    render(<AccessibilityTools handleClickContrastButton={handleClick} />);
    const acessBtn = screen.getByText('Acessibilidade');
    expect(acessBtn).toBeTruthy();
  });

  it('AccessibilityTools: O Modal deve ser apresentado quando clicado no widget', () => {
    render(<AccessibilityTools handleClickContrastButton={handleClick} />);
    const acessBtn = screen.getByText('Acessibilidade');
    fireEvent.click(acessBtn);
    const modal = screen.getByRole('presentation');
    expect(modal.getAttribute('aria-hidden')).toBeNull();
  });

  it('AccessibilityTools: Botão de Contrastes deve ser exibido', () => {
    render(<AccessibilityTools handleClickContrastButton={handleClick} />);
    const contrastBtn = screen.queryAllByText('Contrastes');
    expect(contrastBtn).toBeTruthy();
  });

  it('Exibir a logo default', async () => {
    render(
      <ThemeProvider theme={theme('default')}>
        <AccessibilityTools handleClickContrastButton={handleClick} />
      </ThemeProvider>,
    );

    const button = screen.getByText('Acessibilidade');
    await fireEvent.click(button);

    await waitFor(() => {
      screen.getByLabelText('Mudar contraste da tela');
    });
  });
});
