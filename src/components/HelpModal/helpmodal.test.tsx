import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HelpModal from './index';
import userEvent from '@testing-library/user-event';
import React from 'react';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockNavigate,
  };
});

describe('HelpModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('Deve renderizar o botão de contato', () => {
    const setAanchorElHelpModal = jest.fn();
    const anchorElHelpModal = null;
    render(
      <HelpModal
        anchorElHelpModal={anchorElHelpModal}
        setAnchorElHelpModal={setAanchorElHelpModal}
      />,
    );

    const contatoButton = screen.getByText('Contato');
    expect(contatoButton).toBeInTheDocument();
  });

  test('Deve renderizar o botão de sobre', () => {
    const setAanchorElHelpModal = jest.fn();
    const anchorElHelpModal = null;
    render(
      <HelpModal
        anchorElHelpModal={anchorElHelpModal}
        setAnchorElHelpModal={setAanchorElHelpModal}
      />,
    );

    const sobreButton = screen.getByText('Sobre');
    expect(sobreButton).toBeInTheDocument();
  });

  test('Ao clicar no botão "sobre", deve direcionar para pagina de sobre', async () => {
    const setAnchorElHelpModal = jest.fn();
    const anchorElHelpModal = null;
    render(
      <HelpModal
        anchorElHelpModal={anchorElHelpModal}
        setAnchorElHelpModal={setAnchorElHelpModal}
      />,
    );

    const sobreButton = screen.getByText('Sobre');
    await act(async () => {
      await userEvent.click(sobreButton);
    });

    await waitFor(() => {
      expect(mockNavigate).toBeCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockNavigate).toBeCalledWith('/sobre');
    });
  });

  test('Ao clicar no botão "contato", deve direcionar para pagina de contato', async () => {
    const setAnchorElHelpModal = jest.fn();
    const anchorElHelpModal = null;
    render(
      <HelpModal
        anchorElHelpModal={anchorElHelpModal}
        setAnchorElHelpModal={setAnchorElHelpModal}
      />,
    );

    const contatoButton = screen.getByText('Contato');
    await act(async () => {
      await userEvent.click(contatoButton);
    });

    await waitFor(() => {
      expect(mockNavigate).toBeCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockNavigate).toBeCalledWith('/contato');
    });
  });
});
