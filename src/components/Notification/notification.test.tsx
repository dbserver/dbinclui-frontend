import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Notification from '@components/Notification';

describe('Componente de notificação', () => {
  test('Deve renderizar o componente com uma mensagem definida', () => {
    const message = 'Teste de notificação';
    render(<Notification variant="error" message={message} />);

    const notificationComponent = screen.getByText(message);

    expect(notificationComponent).toBeVisible();
  });

  test("Quando nenhum título é definido e a variant é 'error' um título padrão deve ser utilizado", () => {
    const message = 'Teste de notificação';
    render(<Notification variant="error" message={message} />);

    const defaultErrorTitle = 'Erro';

    const notificationTitleText = `Título da Notificação:${defaultErrorTitle}`;

    const notificationTitle = screen.getByTitle(notificationTitleText);
    expect(notificationTitle).toHaveTextContent(defaultErrorTitle);
  });

  test("Quando nenhum título é definido e a variant é 'success' um título padrão deve ser utilizado", () => {
    const message = 'Teste de notificação';
    render(<Notification variant="success" message={message} />);

    const defaultSuccessTitle = 'Sucesso';

    const notificationTitleText = `Título da Notificação:${defaultSuccessTitle}`;

    const notificationTitle = screen.getByTitle(notificationTitleText);
    expect(notificationTitle).toHaveTextContent(defaultSuccessTitle);
  });

  test('Deve mostrar um título definido pelo usuário quando este está presente', () => {
    const message = 'Teste de notificação';
    const title = 'Esse é um título de teste da notificação';
    render(<Notification variant="error" message={message} title={title} />);

    const notificationTitleText = `Título da Notificação:${title}`;

    const notificationTitle = screen.getByTitle(notificationTitleText);
    expect(notificationTitle).toHaveTextContent(title);
  });

  test('Deve fechar a notificação quando o botão de fechar for clicado', () => {
    const message = 'Teste de notificação';
    render(<Notification variant="error" message={message} />);

    const closeButtonText = 'Fechar';
    const closeButton = screen.getByTitle(closeButtonText);

    userEvent.click(closeButton);

    const notificationComponent = screen.queryByText(message);

    waitFor(() => {
      expect(notificationComponent).not.toBeVisible();
    });
  });

  test('Deve chamar a função passada pela propriedade onClose quando a notificação for fechada', () => {
    const message = 'Teste de notificação';
    const onCloseFunction = jest.fn();
    render(
      <Notification
        variant="error"
        message={message}
        onClose={onCloseFunction}
      />,
    );

    const closeButtonText = 'Fechar';
    const closeButton = screen.getByTitle(closeButtonText);

    userEvent.click(closeButton);

    waitFor(() => {
      expect(onCloseFunction).toBeCalled();
    });
  });
});
