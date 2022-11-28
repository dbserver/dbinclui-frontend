import React from 'react';
import { Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import AccessibilityTypography from '@components/AccessibilityTypography';

export interface CardHomeProps {
  title: string;
  image: String;
  path: string;
  tabIndex?: number;
  guideId: string;
}

export const CardHome: React.FC<CardHomeProps> = ({
  title,
  image,
  path,
  tabIndex,
  guideId,
}): JSX.Element => (
  <Grid
    item
    sm={12}
    xs={12}
    lg={3}
    component={Link}
    to={`guia/${path}`}
    state={{ id: guideId }}
    data-testid={'cardHome'}
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
          className="card-home"
        ></Paper>
      </Grid>
    </Grid>
  </Grid>
);

export default CardHome;
