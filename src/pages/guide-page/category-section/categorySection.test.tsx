import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategorySection from '@pages/guide-page/category-section';

describe('Componente de seção de categoria', () => {
  const mockCategory = {
    title: 'Titulo categoria',
    shortDescription: 'Descrição categoria',
    guide: {} as any,
    digitalContents: [
      {
        guide: {} as any,
        category: {} as any,
        title: 'Titulo Conteudo Digital',
        shortDescription: 'Descrição Conteudo Digital',
        filePaths: [{ filePath: 'arquivo/img.png', publicId: 'img.png' }],
      },
    ],
  };

  test('Deve renderizar uma categoria com título, descrição e carrosel de imagens', () => {
    render(<CategorySection index="0" category={mockCategory} />);

    const title = screen.getByText(mockCategory.title);
    const description = screen.getByText(mockCategory.shortDescription);
    const media = screen.getByLabelText(
      mockCategory.digitalContents[0].shortDescription,
    );

    expect(title).toBeVisible();
    expect(description).toBeVisible();

    expect(media).toBeVisible();
    expect(media).toHaveAttribute(
      'src',
      mockCategory.digitalContents[0].filePaths[0].filePath,
    );
  });
});
