import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from './index';

describe('Componente do Footer', () => {
  test('deve existir um footer na página', () => {
    expect(Footer).toBeTruthy();
  });

  test('deve existir um texto de direitos autorais', () => {
    render(<Footer />);

    let anoAtual = new Date().getFullYear();
    const FooterCopyright = screen.getByText(
      `© ${anoAtual} DBInclui - Todos os direitos reservados`,
    );
    expect(FooterCopyright).toBeInTheDocument();
  });
});
