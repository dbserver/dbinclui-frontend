import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { SearchBar } from '.';

describe('SeachBar', () => {
    const ref: React.RefObject<HTMLInputElement> = { current: null };


    it('Testar se a função handle está sendo chamada ao clicar enter', async () => {
        const handleEnterMock = jest.fn();
        render(
            <SearchBar
                inputRef={ref}
                filterFunc={() => { }}
                handleEnterKey={handleEnterMock}
            ></SearchBar>
        )
        const searchElement = screen.getByPlaceholderText(
            'Localizar Guia...',
        ) as HTMLInputElement;

        await userEvent.type(searchElement, '{enter}')
        expect(handleEnterMock).toBeCalled()
    })


    it('Testar se a função filter vai ser chamada ao ser clicada', async () => {
        const filterFuncMock = jest.fn();
        render(
            <SearchBar
                inputRef={ref}
                filterFunc={filterFuncMock}
                handleEnterKey={function (e: any): void { }}
            ></SearchBar>
        );

        const buttonElement = screen.getByRole('button');
        await userEvent.click(buttonElement);

        expect(filterFuncMock).toHaveBeenCalled();
    });

    it('Testar se o Search bar possui placeholder', () => {
        render(
            <SearchBar
                inputRef={ref}
                filterFunc={function (): void { }}
                handleEnterKey={function (e: any): void { }}
            ></SearchBar>,
        );
        const searchElement = screen.getByPlaceholderText('Localizar Guia...');
        expect(searchElement).not.toBeNull();
    });

    it('Deve retornar o valor digitado', async () => {
        render(
            <SearchBar
                inputRef={ref}
                filterFunc={function (): void { }}
                handleEnterKey={function (e: any): void { }}
            ></SearchBar>,
        );

        const searchElement = screen.getByPlaceholderText(
            'Localizar Guia...',
        ) as HTMLInputElement;
        await userEvent.type(searchElement, 'Olá mundo.');
        expect(searchElement.value).toBe('Olá mundo.');
    });
});