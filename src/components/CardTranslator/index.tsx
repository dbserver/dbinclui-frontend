import React from 'react';
import { Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import AccessibilityTypography from '@components/AccessibilityTypography';

export interface CardTranslatorProps {
  title: string;
  image?: String;
  path: string;
  tabIndex?: number;
}

export const CardTranslator: React.FC<CardTranslatorProps> = ({
  title,
  image,
  path,
  tabIndex,
}): JSX.Element => (
  <Grid
    item
    sm={12}
    xs={12}
    lg={3}
    component={Link}
    to={`/${path}`}
    data-testid={'CardTranslator'}
    style={{ textDecoration: 'none', color: 'inherit' }}
  >
    <Grid flexDirection={'column'} alignItems={'center'} container>
      <Grid item>
        <AccessibilityTypography
          sx={{
            textDecoration: 'none',
            textTransform: 'uppercase',
            color: 'text',
            textAlign: 'center',
            display: 'flex',
            marginLeft: '15px',
            alignItems: 'center',
            margin: '-15px',
            mt: '8px',
          }}
          variant="h5"
          mb={'25px'}
        >
          {title}
        </AccessibilityTypography>
      </Grid>
      <Grid item>
        <Paper
          variant="outlined"
          sx={{
            backgroundColor: 'secondary.light',
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '14.25rem 12rem',
            backgroundPosition: 'center center',
            width: '14.25rem',
            height: '12rem',
            borderRadius: '1.25rem',
            mb: 2,
            mt: '30px',
          }}
          tabIndex={tabIndex}
          aria-label={title}
          role="button"
          className="card-translator"
        ></Paper>
      </Grid>
    </Grid>
  </Grid>
);

export default CardTranslator;
