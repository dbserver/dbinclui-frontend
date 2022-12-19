import AccessibilityTypography from '@components/AccessibilityTypography';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  Paper,
} from '@mui/material';
import styles from './styles';
import React, { useState } from 'react';
import { CustomTypography } from '@components/CustomTypography';
import MicIcon from '@mui/icons-material/Mic';
import SaveDbIcon from '@components/svgs/savedbIcon';
import SaveIcon from '@components/svgs/saveIcon';

export interface TranslatorProps {}

export const Translator: React.FC<TranslatorProps> = (): JSX.Element => {
  const [expression, setExpression] = useState('');
  let click = new Event('click');
  let texto = document.querySelector('#texto');
  let btn = document.querySelector('#btn') as HTMLButtonElement;

  const saveExpression = () => {
    console.log('Saving expression');
  };

  const saveExpressionDB = () => {
    console.log('Saving expressionDB');
  };

  const lerTexto = () => {
    if (texto?.firstChild) {
      texto.firstChild.dispatchEvent(click);
    }
  };

  const traduzir = () => {
    let btn = document.querySelector('#btn') as HTMLButtonElement;

    let imgVlibras = document.querySelector('[vw] [vw-access-button]');
    if (expression)
      if (imgVlibras?.classList.value === 'active') {
        imgVlibras.dispatchEvent(click);
        setTimeout(() => {
          lerTexto();
          btn.setAttribute('disabled', '');
        }, 10000);
        setInterval(() => {}, 1000);
      } else {
        imgVlibras?.dispatchEvent(click);
        if (texto) texto.textContent = expression;
        imgVlibras?.dispatchEvent(click);
        btn.setAttribute('disabled', '');
        setTimeout(() => {
          lerTexto();
        }, 1000);
      }
  };

  return (
    <>
      <Container>
        <Grid
          container
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <CustomTypography component="h1" fontSize={32} fontWeight={700}>
            Tradutor
          </CustomTypography>
          <AccessibilityTypography>
            Digite a palavra ou frase que deseja, para que o vLibras a traduza!
          </AccessibilityTypography>

          <Box width={'54vw'}>
            <AccessibilityTypography mt={8}>
              Expressão a ser traduzida:
            </AccessibilityTypography>

            <Paper
              component="form"
              aria-label="Barra de Tradução"
              sx={styles.input}
            >
              <Box>
                <AccessibilityTypography id="texto" sx={styles.inputLabel}>
                  {expression}
                </AccessibilityTypography>
              </Box>
              <Box>
                <IconButton
                  onClick={saveExpression}
                  type="button"
                  aria-label="save"
                  sx={styles.saveButton}
                >
                  <SaveIcon />
                </IconButton>
                <IconButton
                  onClick={saveExpressionDB}
                  type="button"
                  aria-label="savedb"
                >
                  <SaveDbIcon />
                </IconButton>
              </Box>
            </Paper>
          </Box>
          <Box sx={styles.FormControl}>
            <InputBase
              sx={styles.inputExpression}
              aria-label="Campo de Tradução"
              placeholder="Digite uma frase ou expressão..."
              onChange={(event) => {
                setExpression(event.target.value);
              }}
            />
            <IconButton sx={styles.micButton}>
              <MicIcon color="primary" />
            </IconButton>
          </Box>
          <Button
            sx={styles.button}
            type="button"
            aria-label="BOTÃO TRADUZIR"
            id="btn"
            onClick={traduzir}
          >
            Traduzir
          </Button>
        </Grid>
      </Container>
    </>
  );
};

export default Translator;
