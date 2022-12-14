import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ViewDigitalContent from './'; //Componente
import { getDigitalContentById } from '@services/digitalContent'; // Função que retorna o digital content

//Mock da requição do digital content por ID
const getDigitalContentByIdMock = getDigitalContentById as jest.MockedFunction<
    typeof getDigitalContentById
>;

// Necessário mockar o navigator e passar o ID por meio de parâmetros;
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => {
    const useHref = jest.fn();
    return {
        useHref,
        useNavigate: () => mockedNavigate,
        useParams: () => ({
            id: '1',
        }),
    };
});

// Necessário mockar a importação!
jest.mock('@services/digitalContent');
jest.mock('@services/categories');
jest.mock('@services/guides');

describe('ViewDigitalContent', () => {
    const mockDigitalContent = {
        _id: '1',
        title: 'Titulo do conteúdo',
        shortDescription: 'Descrição',
        guide: {
            _id: '6382b82611a630eb7bf0fb7e',
            title: 'Guia de acessibilidade',
            content: 'O guia acessível',
            filePaths: {
                filePath:
                    'https://res.cloudinary.com/duxvxgg4t/image/upload/v1669511299/uploads/d2cnonynuogw4b5z7xee.png',
                publicId: 'uploads/d2cnonynuogw4b5z7xee',
            },
        },
        category: {
            _id: '6382b8be11a630eb7bf0fbaf',
            title: 'Categoria de acessibilidade',
            shortDescription: 'descrição da categoria de acessibilidade',
            guide: '6382b82611a630eb7bf0fb7e',
        },
        filePaths: [
            {
                filePath:
                    'https://res.cloudinary.com/duxvxgg4t/video/upload/v1670276349/uploads/ra1saywtgnglipikof0p.mp4',
                publicId: 'uploads/ra1saywtgnglipikof0p',
                _id: '638e64ffb9180077c5c957f1',
            },
        ],
    };

    //Antes de cada teste fazemos a requisição mock
    beforeEach(() => {
        getDigitalContentByIdMock.mockResolvedValue({
            data: { data: mockDigitalContent },
        } as any);
    });

    test('Deve chamar o GetDigitalContentById ao renderizar a página', async () => {
        await act(() => {
            render(<ViewDigitalContent />);
        });

        expect(getDigitalContentByIdMock).toBeCalled();
    });

    test('Deve ter a descrição de acordo com a entidade requisitada', async () => {
        await act(() => {
            render(<ViewDigitalContent />);
        });
        //screen.logTestingPlaygroundURL()
        const inputDescricaoElement = screen.getByRole('textbox', {
            name: /descrição:/i
        }) as HTMLInputElement;

        expect(inputDescricaoElement.value).toBe('Descrição');
        expect(inputDescricaoElement.readOnly).toBeTruthy();
    });

    test('Deve ter o título de acordo com a entidade requisitada', async () => {
        await act(() => {
            render(<ViewDigitalContent />);
        });

        const inputTitleElement = screen.getByRole('textbox', {
            name: /título:/i,
        }) as HTMLInputElement;

        expect(inputTitleElement.value).toBe('Titulo do conteúdo');
        expect(inputTitleElement.readOnly).toBeTruthy();
    });

    test('Espera que o src da imagem seja o mesmo da entidade', async () => {
        await act(() => {
            render(<ViewDigitalContent />);
        });

        const imageViewElement = screen.getByLabelText('media do conteúdo digital') as HTMLImageElement

        expect(imageViewElement.src).toBe('https://res.cloudinary.com/duxvxgg4t/video/upload/v1670276349/uploads/ra1saywtgnglipikof0p.mp4')
    });

    test('Botão Voltar deve redirecionar para a página de listagem', async () => {
        await act(() => {
            render(<ViewDigitalContent />);
        });

        const button = await screen.findByTestId('back');
        expect(button).toHaveAttribute('to', '/admin/listar-conteudo-digital');
    });
});