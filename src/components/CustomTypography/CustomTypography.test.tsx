import React from 'react';
import { render, screen } from '@testing-library/react';
import { CustomTypography } from './index';

describe('CustomTypography Component', () => {
  it('CustomTypography: Tipografia renderizada pelo componente', () => {
    const testeContent = 'Teste';
    render(
      <CustomTypography component="p" fontSize={16}>
        {testeContent}
      </CustomTypography>,
    );
    screen.getByText(testeContent, {
      selector: 'p',
      exact: true,
    });
  });
});
