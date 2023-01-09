import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ItemList } from '@components/CardExpression/ItemList';
import userEvent from '@testing-library/user-event';

describe('ItemList', () => {
  const handleFavoriteExpressionMock = jest.fn();
  const handleDeleteExpressionMock = jest.fn();

  it('Testar se a função deletar vai ser chamada ao ser clicada', async () => {
    render(
      <ItemList
        title={'Expressão Teste'}
        isFavorite={false}
        handleFavoriteExpression={handleFavoriteExpressionMock}
        handleDeleteExpression={handleDeleteExpressionMock}
      />,
    );

    const buttonDelete = screen.getByLabelText('deleteButton');
    await userEvent.click(buttonDelete);
    expect(handleDeleteExpressionMock).toHaveBeenCalled();
  });

  it('Testar se a função favoritar vai ser chamada ao ser clicada', async () => {
    render(
      <ItemList
        title={'Expressão Teste'}
        isFavorite={false}
        handleFavoriteExpression={handleFavoriteExpressionMock}
        handleDeleteExpression={handleDeleteExpressionMock}
      />,
    );

    const buttonFavorite = screen.getByLabelText('favoriteButton');
    await userEvent.click(buttonFavorite);
    expect(handleFavoriteExpressionMock).toHaveBeenCalled();
  });

  it('Testar se a o titulo da expressão esta renderizando', async () => {
    render(
      <ItemList
        title={'Expressão Teste'}
        isFavorite={false}
        handleFavoriteExpression={handleFavoriteExpressionMock}
        handleDeleteExpression={handleDeleteExpressionMock}
      />,
    );

    const expressionTitle = await screen.findByText('Expressão Teste');
    expect(expressionTitle).toBeInTheDocument();
  });
});
