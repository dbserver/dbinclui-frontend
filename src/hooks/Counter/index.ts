import { useState } from 'react';

export interface UseCounterProps {
  handleCounter?: (counter: number) => void;
  limiters: [number, number];
}

export interface UseCounterHook {
  counter: number;
  add: (counter: number) => void;
  remove: (counter: number) => void;
}

export const UseCounter = ({
  handleCounter,
  limiters: [start, end],
}: UseCounterProps): UseCounterHook => {
  const [counter, setCounter] = useState<number>(start);
  return {
    counter,
    add: add(end, setCounter, handleCounter),
    remove: remove(start, setCounter, handleCounter),
  };
};

export const remove = (
  start: number,
  setCounter: React.Dispatch<React.SetStateAction<number>>,
  handleCounter?: (counter: number) => void,
) => {
  return (counter: number) => {
    const removeCounter = counter === start ? counter : counter - 1;
    setCounter(removeCounter);
    if (handleCounter) {
      handleCounter(removeCounter);
    }
  };
};

export const add = (
  end: number,
  setCounter: React.Dispatch<React.SetStateAction<number>>,
  handleCounter?: (counter: number) => void,
) => {
  return (counter: number) => {
    const addCounter = counter === end ? counter : counter + 1;
    setCounter(addCounter);
    if (handleCounter) {
      handleCounter(addCounter);
    }
  };
};

export default UseCounter;
