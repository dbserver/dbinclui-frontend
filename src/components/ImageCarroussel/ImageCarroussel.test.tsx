import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ImageCarroussel from '@components/ImageCarroussel';

describe('Componente de notificação', () => {
  // input data
  const mockDigitalContents = [
    {
      title: 'Conteúdo Digital 1',
      shortDescription: 'Descrição 1',
      filePaths: [
        { filePath: 'arquivo1/img.png', publicId: 'img.png' },
        { filePath: 'arquivo1/img.jpg', publicId: 'img.png' },
      ],
    },
    {
      title: 'Conteúdo Digital 2',
      shortDescription: 'Descrição 2',
      filePaths: [
        { filePath: 'arquivo2/video.mp4', publicId: 'video.mp4' },
        { filePath: 'arquivo2/img.jpeg', publicId: 'img.jpeg' },
      ],
    },
  ];

  // parsed data
  const mockArrayOfContents = [
    {
      digitalContentIndex: 0,
      filePath: 'arquivo1/img.png',
    },
    {
      digitalContentIndex: 0,
      filePath: 'arquivo1/img.jpg',
    },
    {
      digitalContentIndex: 1,
      filePath: 'arquivo2/video.mp4',
    },
    {
      digitalContentIndex: 1,
      filePath: 'arquivo2/img.jpeg',
    },
  ];

  test('Deve renderizar um carrosel com as mídias dos conteúdos digitais', () => {
    render(
      <ImageCarroussel
        contents={mockDigitalContents}
        width="10rem"
        height="10rem"
      />,
    );

    const mediaTitle = screen.getByText(mockDigitalContents[0].title);
    const mediaDescription = screen.getByText(
      mockDigitalContents[0].shortDescription,
    );
    const media = screen.getByLabelText(
      mockDigitalContents[0].shortDescription,
    );

    expect(mediaTitle).toBeVisible();

    expect(mediaDescription).toBeVisible();

    expect(media).toBeVisible();
    expect(media).toHaveAttribute(
      'src',
      mockDigitalContents[0].filePaths[0].filePath,
    );
  });

  test('Deve mostrar a próxima mídia quando o botão "Próximo" for clicado', () => {
    render(
      <ImageCarroussel
        contents={mockDigitalContents}
        width="10rem"
        height="10rem"
      />,
    );

    const nextButton = screen.getByText('Próximo');
    userEvent.click(nextButton);

    const media = screen.getByLabelText(
      mockDigitalContents[0].shortDescription,
    );

    waitFor(() => {
      expect(media).toBeVisible();
      expect(media).toHaveAttribute(
        'src',
        mockDigitalContents[0].filePaths[1].filePath,
      );
    });
  });

  test('Deve mostrar a mídia anterior quando o botão "Anterior" for clicado', () => {
    render(
      <ImageCarroussel
        contents={mockDigitalContents}
        width="10rem"
        height="10rem"
      />,
    );

    // because to go back, you first need to go forwards
    const nextButton = screen.getByText('Próximo');
    userEvent.click(nextButton);

    const backButton = screen.getByText('Anterior');
    userEvent.click(backButton);

    const media = screen.getByLabelText(
      mockDigitalContents[0].shortDescription,
    );

    expect(media).toBeVisible();
    expect(media).toHaveAttribute(
      'src',
      mockDigitalContents[0].filePaths[0].filePath,
    );
  });

  test('Deve desabilitar o botão "Anterior" quando a primeira mídia está sendo renderizada', () => {
    render(
      <ImageCarroussel
        contents={mockDigitalContents}
        width="10rem"
        height="10rem"
      />,
    );

    const backButton = screen.getByText('Anterior');

    expect(backButton).toBeDisabled();
  });

  test('Deve desabilitar o botão "Próximo" quando a última mídia está sendo renderizada', () => {
    render(
      <ImageCarroussel
        contents={mockDigitalContents}
        width="10rem"
        height="10rem"
      />,
    );

    const nextButton = screen.getByText('Próximo');

    // first go to the last media
    mockArrayOfContents.forEach(() => userEvent.click(nextButton));

    waitFor(() => {
      expect(nextButton).toBeDisabled();
    });
  });

  test('Deve conter conteúdos digitais em um único array', () => {
    render(
      <ImageCarroussel
        contents={mockDigitalContents}
        width="10rem"
        height="10rem"
      />,
    );

    const nextButton = screen.getByText('Próximo');

    for (const mediaContent of mockArrayOfContents) {
      const media = screen.getByRole('img', {
        name: /descrição /i,
      });

      userEvent.click(nextButton);

      waitFor(() => {
        expect(media).toHaveAttribute('src', mediaContent.filePath);
      });
    }
  });
});
