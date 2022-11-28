import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export interface AdminProps {}

export const Admin: React.FC<AdminProps> = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <>
      <Grid
        container
        sx={{
          justifyContent: 'center',
          p: 1,
          mt: 5,
        }}
      >
        <Grid
          item
          md={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ m: 2, width: '100%' }}>
            <Button
              sx={{
                color: 'text.disabled',
                backgroundColor: 'secondary.dark',
                border: '2px solid',
                borderColor: 'text.disabled',
                borderRadius: '10px',
              }}
              fullWidth
              variant="contained"
              size="large"
              onClick={() => {
                navigate('listar-guias');
              }}
            >
              Administrar Guia
            </Button>
          </Box>

          <Box sx={{ m: 2, width: '100%' }}>
            <Button
              sx={{
                color: 'text.disabled',
                backgroundColor: 'secondary.dark',
                border: '2px solid',
                borderColor: 'text.disabled',
                borderRadius: '10px',
              }}
              fullWidth
              variant="contained"
              size="large"
              onClick={() => {
                navigate('listar-categorias');
              }}
            >
              Administrar Categorias
            </Button>
          </Box>

          <Box sx={{ m: 2, width: '100%' }}>
            <Button
              sx={{
                color: 'text.disabled',
                backgroundColor: 'secondary.dark',
                border: '2px solid',
                borderColor: 'text.disabled',
                borderRadius: '10px',
              }}
              fullWidth
              variant="contained"
              size="large"
              onClick={() => {
                navigate('listar-conteudo-digital');
              }}
            >
              Administrar Conteúdo Digital
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Admin;
