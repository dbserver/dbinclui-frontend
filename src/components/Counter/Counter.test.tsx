import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Counter from '@components/Counter';

describe('Counter Component', () => {
  const counterProps = {
    counter: 1,
    add: jest.fn(),
    remove: jest.fn(),
  };
  it('Counter: Deve ser dinâmico quando houver ação de adicionar/remover', () => {
    render(<Counter {...counterProps} />);
    const addIcon = screen.getByTestId('AddIcon');
    const removeIcon = screen.getByTestId('RemoveIcon');
    fireEvent.click(addIcon);
    fireEvent.click(removeIcon);
    fireEvent.click(addIcon);
    expect(counterProps.remove).toBeCalledTimes(1);
    expect(counterProps.add).toBeCalledTimes(2);
  });
});
