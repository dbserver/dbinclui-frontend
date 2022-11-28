import React, { SetStateAction } from 'react';
import { add, remove } from '@hooks/Counter';

jest.mock('react');

describe('Counter hook', () => {
  it('Counter hook Método "add"', () => {
    const counter = 1;
    const handleCounter = jest.fn();
    const setCounter = jest.fn() as unknown as React.Dispatch<
      SetStateAction<number>
    >;

    const fn = add(3, setCounter, handleCounter);
    fn(counter);
    expect(handleCounter).toBeCalledWith(2);
    expect(setCounter).toBeCalledWith(2);
  });

  it('Counter hook método "add": contador maior que o limite', () => {
    const counter = 3;
    const handleCounter = jest.fn();
    const setCounter = jest.fn() as unknown as React.Dispatch<
      SetStateAction<number>
    >;
    const fn = add(3, setCounter, handleCounter);
    fn(counter);
    expect(handleCounter).toBeCalledWith(counter);
    expect(setCounter).toBeCalledWith(counter);
  });

  it('Counter hook Método "remove"', () => {
    const handleCounter = jest.fn();
    const setCounter = jest.fn() as unknown as React.Dispatch<
      SetStateAction<number>
    >;
    const fn = remove(1, setCounter, handleCounter);
    fn(5);
    expect(handleCounter).toBeCalledWith(4);
    expect(setCounter).toBeCalledWith(4);
  });

  it('Counter hook Método "remove": contador menor que o limite', () => {
    const handleCounter = jest.fn();
    const setCounter = jest.fn() as unknown as React.Dispatch<
      SetStateAction<number>
    >;
    const fn = remove(1, setCounter, handleCounter);
    fn(1);
    expect(handleCounter).toBeCalledWith(1);
    expect(setCounter).toBeCalledWith(1);
  });
});
