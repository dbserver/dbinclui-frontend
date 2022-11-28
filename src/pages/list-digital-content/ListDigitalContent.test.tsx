import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ListDigitalContent } from './index';
import '@testing-library/jest-dom/extend-expect';
import {
  DigitalContentInterface,
  getDigitalContent,
} from '@services/digitalContent';
import { AxiosResponse } from 'axios';

jest.mock('@services/digitalContent');

jest.mock('react-router-dom', () => {
  const useNavigate = jest.fn();
  return {
    useNavigate,
  };
});

const getDigitalContentMock = getDigitalContent as jest.MockedFunction<
  typeof getDigitalContent
>;

describe('Teste do componente', () => {
  test('Deve exibir o título da página', () => {
    render(<ListDigitalContent />);

    const pageTitle = 'LISTAGEM DE CONTEÚDO DIGITAL';
    const textTitle = screen.getByText(pageTitle);
    expect(textTitle).toBeVisible();
  });

  beforeEach(() => {
    getDigitalContentMock.mockClear();
  });

  test('Deve listar os conteúdos digitais', async () => {
    getDigitalContentMock.mockImplementation(
      async () =>
        ({
          data: { data: [] },
        } as unknown as Promise<
          AxiosResponse<{ data: DigitalContentInterface[] }>
        >),
    );

    await act(async () => {
      render(<ListDigitalContent />);
    });

    expect(getDigitalContentMock).toBeCalledTimes(1);
  });
});
