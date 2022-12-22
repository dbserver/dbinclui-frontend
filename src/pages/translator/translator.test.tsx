import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Translator from '@pages/translator';
import '@testing-library/jest-dom';
import React from 'react';

describe('Página de tradutor de expressões', () => {
  it('Testar se o inputExpression possui placeholder', () => {
    render(<Translator />);
    const inputExpressionElement = screen.getByPlaceholderText(
      'Digite uma frase ou expressão...',
    ) as HTMLInputElement;
    expect(inputExpressionElement).not.toBeNull();
  });

  it('Deve retornar a expressão digitada', async () => {
    render(<Translator />);

    const inputExpressionElement = screen.getByPlaceholderText(
      'Digite uma frase ou expressão...',
    ) as HTMLInputElement;
    await userEvent.type(inputExpressionElement, 'Olá, como vai você?');
    expect(inputExpressionElement.value).toBe('Olá, como vai você?');
  });


});
