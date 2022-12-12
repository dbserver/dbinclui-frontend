import { render, screen, act, waitFor } from '@testing-library/react';
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

  test('Validar se a opção de visualizar conteudo digital existe na tela', async () => {
    const dataMockDigitalContent = [
      {
        _id: "a1",
        guide: {
          _id: "a1",
          content: "Teste",
          title: "Teste",
          filePaths: {
            filePath: "www.qualquercoisa.com",
            publicId: "qualquercoisa"
          }
        },
        category: {
          _id: "a1",
          title: "Categoria",
          shortDescription: "Categoria",
          guide: {
            _id: "a1",
            content: "Teste",
            title: "Teste",
            filePaths: {
              filePath: "www.qualquercoisa.com",
              publicId: "qualquercoisa"
            },
          }
        },
        shortDescription: "Teste",
        filePaths: [{
          filePath: "https://res.cloudinary.com/duxvxgg4t/image/upload/v1669992224/uploads/ytk8mbjdaptazismwx12.jpg",
          publicId: "uploads/ytk8mbjdaptazismwx12",
          _id: "a1"
        }]
      }
    ];

    getDigitalContentMock.mockImplementation(
      async () =>
      ({
        data: { data: dataMockDigitalContent },
      } as unknown as Promise<
        AxiosResponse<{ data: DigitalContentInterface[] }>
      >),
    );

    await act(async () => {
      render(<ListDigitalContent />);
    });

    expect(
      screen.getByRole('link', {
        name: 'visualizar'
      })
    ).toBeVisible();
  });

  test('Botão visualizar deve redirecionar para página de visualização', async () => {
    const dataMockDigitalContent = [
      {
        _id: "a1",
        guide: {
          _id: "a1",
          content: "Teste",
          title: "Teste",
          filePaths: {
            filePath: "www.qualquercoisa.com",
            publicId: "qualquercoisa"
          }
        },
        category: {
          _id: "a1",
          title: "Categoria",
          shortDescription: "Categoria",
          guide: {
            _id: "a1",
            content: "Teste",
            title: "Teste",
            filePaths: {
              filePath: "www.qualquercoisa.com",
              publicId: "qualquercoisa"
            },
          }
        },
        shortDescription: "Teste",
        filePaths: [{
          filePath: "https://res.cloudinary.com/duxvxgg4t/image/upload/v1669992224/uploads/ytk8mbjdaptazismwx12.jpg",
          publicId: "uploads/ytk8mbjdaptazismwx12",
          _id: "a1"
        }]
      }
    ];

    getDigitalContentMock.mockImplementation(
      async () =>
      ({
        data: { data: dataMockDigitalContent },
      } as unknown as Promise<
        AxiosResponse<{ data: DigitalContentInterface[] }>
      >),
    );

    await act(async () => {
      render(<ListDigitalContent />);
    });

    expect(screen.getByRole('link', {
      name: 'visualizar'
    })).toHaveAttribute('href', '/admin/visualizar-conteudo-digital/' + dataMockDigitalContent[0]._id);
  });
});
