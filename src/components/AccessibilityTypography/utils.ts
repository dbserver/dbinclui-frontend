import { TypographyProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

type GetFontSizeType = (
  target: string | number | never,
  scale: number,
) => string;

export const getFontSize: GetFontSizeType = (target, scale) => {
  const defaultFontSize = 16;
  if (!target) {
    return defaultFontSize + 'px';
  }
  const fontSize = target.toString().replace(/\d/gi, '');
  const size = +fontSize || defaultFontSize;
  return size * scale + 'px';
};

export const getDefaultFontSize = (
  { variant }: { variant: TypographyProps['variant'] },
  theme: Theme,
): string => {
  const variantKey = !variant || variant === 'inherit' ? 'body1' : variant;
  const typography = theme.typography[variantKey];
  return typography.fontSize as string;
};
