import React, { useContext, useMemo } from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { AccessibilityContext } from '@contexts/AccessibilityContext';
import { getFontSize, getDefaultFontSize } from './utils';
import './styles.css';

// comment

export interface AccessibilityTypographyProps extends TypographyProps {
  className?: string;
  component?: React.ElementType;
}

export const AccessibilityTypography: React.FC<
  AccessibilityTypographyProps
> = ({ children, ...props }): JSX.Element => {
  const context = useContext(AccessibilityContext);

  const fontSize = useMemo(
    () => (font: string | number) =>
      getFontSize(font, context.state.fontSizeScale),
    [context.state.fontSizeScale],
  );

  return (
    <Typography
      component={props.component}
      {...props}
      sx={{
        ...props.sx,
        transition: '.3s ease',
        fontSize: (theme) =>
          fontSize(getDefaultFontSize({ variant: props.variant }, theme)),
      }}
      className={context.colorAccessibility ? 'accessColor' : 'defaultColor'}
    >
      {children}
    </Typography>
  );
};

export default AccessibilityTypography;
