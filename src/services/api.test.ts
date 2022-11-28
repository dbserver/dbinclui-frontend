import axios from 'axios';
import { handleAxiosError } from './api';

jest.mock('axios');

const mockIsAxiosError = axios.isAxiosError as jest.MockedFunction<
  typeof axios.isAxiosError
>;

describe('Serviço da API', () => {
  test(`Quando ${handleAxiosError.name} é chamada com um erro de resposta do axios, deve tratar de acordo`, () => {
    mockIsAxiosError.mockReturnValueOnce(true);

    const error: any = new Error('Um erro de resposta do axios');
    // add properties that will be used in the function
    error.response = { data: 'error data' };

    const expectedError = new Error(error.response.data);
    const parsedError = handleAxiosError(error);

    expect(() => {
      throw parsedError;
    }).toThrow(expectedError);
  });

  test(`Quando ${handleAxiosError.name} é chamada com um erro de requisição do axios, deve tratar de acordo`, () => {
    mockIsAxiosError.mockReturnValueOnce(true);

    const error: any = new Error('Um erro de requisição do axios');
    // add properties that will be used in the function
    error.request = { data: 'error data' };

    const expectedError = new Error('Serviço não disponível');
    const parsedError = handleAxiosError(error);

    expect(() => {
      throw parsedError;
    }).toThrow(expectedError);
  });

  test(`Quando ${handleAxiosError.name} é chamada com um erro qualquer, deve tratar de acordo`, () => {
    const error = new Error('Um erro qualquer');
    const expectedError = new Error(
      'Algo de errado ocorreu ao realizar a requisição',
    );
    const parsedError = handleAxiosError(error);

    expect(() => {
      throw parsedError;
    }).toThrow(expectedError);
  });
});
