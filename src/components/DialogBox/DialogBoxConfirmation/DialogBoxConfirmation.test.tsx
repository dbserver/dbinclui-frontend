import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DialogBoxConfirmation from '@components/DialogBox/DialogBoxConfirmation';

describe('Componente de diálogo de confirmação', () => {
  test('Deve chamar a função passada pela propriedade onClose quando a notificação for fechada', () => {
    const onCloseFunction = jest.fn();
    render(
      <DialogBoxConfirmation
        confirmation={true}
        setConfirmation={() => {}}
        onClose={onCloseFunction}
      />,
    );

    const button = screen.getByTestId('nao');
    userEvent.click(button);

    waitFor(() => {
      expect(onCloseFunction).toBeCalled();
    });
  });

  test('Deve chamar a função passada pela propriedade onClose quando a guia for apagada', () => {
    const onCloseFunction = jest.fn();
    render(
      <DialogBoxConfirmation
        confirmation={true}
        setConfirmation={() => {}}
        onClose={onCloseFunction}
      />,
    );

    const button = screen.getByTestId('sim');

    userEvent.click(button);

    waitFor(() => {
      expect(onCloseFunction).toBeCalled();
    });
  });
});
