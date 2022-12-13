import { CustomTypography } from '@components/CustomTypography';
import NoGuides from '@components/svgs/noGuides';
import NoGuidesContrast from '@components/svgs/noGuidesContrast';
import AccessibilityContext from '@contexts/AccessibilityContext';
import { Box, useMediaQuery } from '@mui/material';
import React, { useContext } from 'react';

export const NoGuidesWarning = () => {
  const context = useContext(AccessibilityContext);

  const color = context.colorAccessibility ? '#FFFF00' : '#505050';

  const mobileSize = useMediaQuery('(max-width:600px)');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        pt: 2,
      }}
    >
      <CustomTypography
        color={color}
        fontWeight={500}
        fontSize={32}
        component="h2"
        marginBottom={1}
      >
        OPS...
      </CustomTypography>
      <Box
        sx={{
          width: mobileSize ? '250px' : '500px',
        }}
      >
        {context.colorAccessibility ? <NoGuidesContrast /> : <NoGuides />}
      </Box>
      <CustomTypography
        component="p"
        color={color}
        fontWeight={300}
        fontSize={20}
        marginTop={4}
        textAlign="center"
      >
        Nenhuma guia foi encontrada!
      </CustomTypography>
    </Box>
  );
};

export default NoGuidesWarning;
