import React from 'react';
import { render, screen } from '@testing-library/react';
import AccessibilityTypography from './index';

describe('AccessibilityTypography Component', () => {
  it('AccessibilityTypography: Tipografia renderizada pelo componente', () => {
    const testeContent = 'Teste';
    render(
      <AccessibilityTypography variant="body1">
        {testeContent}
      </AccessibilityTypography>,
    );
    screen.getByText(testeContent, {
      selector: 'p',
      exact: true,
    });
  });
});
