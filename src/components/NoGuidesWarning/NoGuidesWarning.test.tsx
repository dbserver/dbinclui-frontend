import React from 'react';
import { render, screen } from '@testing-library/react';
import NoGuidesWarning from '.';
import '@testing-library/jest-dom/extend-expect';

describe('NoGuidesWarning', () => {
  it('O componente deve renderizar o texto "Nenhuma guia foi encontrada!"', () => {
    render(<NoGuidesWarning />);

    const warningDescription = screen.getByText('Nenhuma guia foi encontrada!');

    expect(warningDescription).toBeInTheDocument();
  });

  it('O componente deve renderizar o texto "OPS..."', () => {
    render(<NoGuidesWarning />);

    const warningHeader = screen.getByText('OPS...');

    expect(warningHeader).toBeInTheDocument();
  });

  it('O Componente deve renderizar o svg de alerta', () => {
    render(<NoGuidesWarning />);

    const warningImage = screen.getByRole('img', {
      name: 'AVISO DE NENHUMA GUIA ENCONTRADA',
    });

    expect(warningImage).toBeInTheDocument();
  });
});
