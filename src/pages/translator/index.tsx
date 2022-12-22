import AccessibilityTypography from '@components/AccessibilityTypography';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
} from '@mui/material';
import styles from './styles';
import React, { useState } from 'react';
import { CustomTypography } from '@components/CustomTypography';
import MicIcon from '@mui/icons-material/Mic';
import SaveDbIcon from '@components/svgs/savedbIcon';
import SaveIcon from '@components/svgs/saveIcon';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

export interface TranslatorProps {}

export const Translator: React.FC<TranslatorProps> = (): JSX.Element => {
  const [expression, setExpression] = useState('');
  let click = new Event('click');
  let texto = document.querySelector('#texto');
  let btn = document.querySelector('#btn') as HTMLButtonElement;
  const [valueInput, setValueInput] = useState('');

  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser does not support speech recognition.</span>;
    }
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setValueInput(transcript);
    setExpression(transcript);
    if (btn.disabled == true) {
      activateButton();
    }
  };

  const saveExpression = () => {
    console.log('Saving expression');
  };

  const saveExpressionDB = () => {
    console.log('Saving expressionDB');
  };

  const disableButton = () => {
    btn.classList.add('Mui-disabled');
    btn.setAttribute('disabled', 'disabled');
  };

  const activateButton = () => {
    btn.removeAttribute('disabled');
    btn.classList.remove('Mui-disabled');
  };

  const lerTexto = () => {
    if (texto?.firstChild) {
      texto.firstChild.dispatchEvent(click);
    }
  };

  async function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setExpression(event.target.value);
    setValueInput(event.target.value);
    activateButton();
  }

  const traduzir = () => {
    disableButton();
    let imgVlibras = document.querySelector('[vw] [vw-access-button]');
    if (expression)
      if (imgVlibras?.classList.value === 'active') {
        imgVlibras.dispatchEvent(click);
        setTimeout(() => {
          lerTexto();
        }, 10000);
        setInterval(() => {}, 1000);
      } else {
        imgVlibras?.dispatchEvent(click);
        if (texto) texto.textContent = expression;
        imgVlibras?.dispatchEvent(click);
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
                  onClick={saveExpressionDB}
                  type="button"
                  aria-label="savedb"
                >
                  <SaveDbIcon />
                </IconButton>
                <IconButton
                  onClick={saveExpression}
                  type="button"
                  aria-label="save"
                  sx={styles.saveButton}
                >
                  <SaveIcon />
                </IconButton>
              </Box>
            </Paper>
          </Box>
          <Box sx={styles.FormControl}>
            <InputBase
              sx={styles.inputExpression}
              aria-label="Campo de Tradução"
              placeholder="Digite uma frase ou expressão..."
              id="inputExpression"
              onChange={handleOnChange}
              value={valueInput}
            />
            <IconButton
              sx={styles.micButton}
              onTouchStart={startListening}
              onMouseDown={startListening}
              onTouchEnd={stopListening}
              onMouseUp={stopListening}
            >
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
