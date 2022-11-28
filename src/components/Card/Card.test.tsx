import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './index';
import CardAcessibilidade from '../../components/Card/index';

describe('Componente do Card', () => {
  test('deve existir um Card na página', () => {
    expect(CardAcessibilidade).toBeTruthy();
  });

  test('deve mostrar um Card com texto', () => {
    render(<Card title={'O que é acessibilidade?'} />);

    const pageTitleContent = 'O que é acessibilidade?';
    const pageTitle = screen.getByText(pageTitleContent);
    expect(pageTitle.textContent).toBe(pageTitleContent);
  });
});
