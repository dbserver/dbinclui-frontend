import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import CardExpression from '.';
import { ItemList } from './ItemList';

describe('CardExpression', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Deve renderizar o titulo da expressao no itemList passado por props', async () => {
    const mockHandleDeleteExpression = jest.fn();
    const mockHandleFavoriteExpression = jest.fn();

    await act(async () => {
      render(
        <CardExpression
          items={[
            <ItemList
              key="1"
              title="Expressão"
              isFavorite={false}
              handleDeleteExpression={mockHandleDeleteExpression}
              handleFavoriteExpression={mockHandleFavoriteExpression}
            />,
          ]}
        />,
      );
    });

    const expressionTitle = screen.getByText('Expressão');

    expect(expressionTitle).toBeInTheDocument();
  });

  test('Dever renderizar a expressao favorita no topo da lista', async () => {
    const mockHandleDeleteExpression = jest.fn();
    const mockHandleFavoriteExpression = jest.fn();

    await act(async () => {
      render(
        <CardExpression
          items={[
            <ItemList
              key="1"
              title="Expressão Normal"
              isFavorite={false}
              handleDeleteExpression={mockHandleDeleteExpression}
              handleFavoriteExpression={mockHandleFavoriteExpression}
            />,
            <ItemList
              key="2"
              title="Expressão Favorita"
              isFavorite={true}
              handleDeleteExpression={mockHandleDeleteExpression}
              handleFavoriteExpression={mockHandleFavoriteExpression}
            />,
          ]}
        />,
      );
    });

    const expressions = screen.getAllByText(/Expressão/i);

    expect(expressions[0].innerHTML).toEqual('Expressão Favorita');
  });

  test('Deve chamar a função de deletar expressão ao clicar no botão', async () => {
    const mockHandleDeleteExpression = jest.fn();
    const mockHandleFavoriteExpression = jest.fn();

    await act(async () => {
      render(
        <CardExpression
          items={[
            <ItemList
              key="1"
              title="Expressão"
              isFavorite={false}
              handleDeleteExpression={mockHandleDeleteExpression}
              handleFavoriteExpression={mockHandleFavoriteExpression}
            />,
          ]}
        />,
      );
    });

    const deleteButton = screen.getByRole('button', {
      name: /deletebutton/i,
    });

    await act(async () => {
      fireEvent.click(deleteButton);
    });

    expect(mockHandleDeleteExpression).toHaveBeenCalledTimes(1);
  });

  test('Deve chamar a função de favoritar a expressão ao clicar no botão', async () => {
    const mockHandleDeleteExpression = jest.fn();
    const mockHandleFavoriteExpression = jest.fn();

    await act(async () => {
      render(
        <CardExpression
          items={[
            <ItemList
              key="1"
              title="Expressão"
              isFavorite={false}
              handleDeleteExpression={mockHandleDeleteExpression}
              handleFavoriteExpression={mockHandleFavoriteExpression}
            />,
          ]}
        />,
      );
    });

    const favoriteButton = screen.getByRole('button', {
      name: /favoritebutton/i,
    });

    await act(async () => {
      fireEvent.click(favoriteButton);
    });

    expect(mockHandleFavoriteExpression).toHaveBeenCalledTimes(1);
  });
});

export {};
