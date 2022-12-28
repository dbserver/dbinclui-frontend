import { Typography } from '@mui/material';
import React, { useContext } from 'react';
import AccessibilityContext from '@contexts/AccessibilityContext';
import './styles.css';

interface CustomTypographyProps {
  children: React.ReactNode;
  component: React.ElementType;
  id?: string;
  fontSize: number;
  fontWeight?: number;
  marginBottom?: number;
  marginTop?: number;
  color?: string;
  textAlign?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
  maxWidth?: string;
  overflow?: string;
  textOverflow?: string;
  whiteSpace?:
    | 'normal'
    | 'pre'
    | 'nowrap'
    | 'pre-wrap'
    | 'pre-line'
    | 'break-spaces';
}

export const CustomTypography: React.FC<CustomTypographyProps> = ({
  children,
  component,
  id,
  fontSize,
  fontWeight,
  marginBottom,
  marginTop,
  color,
  textAlign,
  maxWidth,
  overflow,
  textOverflow,
  whiteSpace,
}) => {
  const context = useContext(AccessibilityContext);

  return (
    <Typography
      id={id}
      component={component}
      className={context.colorAccessibility ? 'accessColor' : 'defaultColor'}
      sx={{
        fontSize: fontSize,
        fontWeight: fontWeight,
        marginBottom: marginBottom,
        marginTop: marginTop,
        color: color,
        textAlign: textAlign,
        maxWidth: maxWidth,
        overflow: overflow,
        textOverflow: textOverflow,
        whiteSpace: whiteSpace,
      }}
    >
      {children}
    </Typography>
  );
};
