import React, { useState, useRef, useContext } from 'react';
import validateInput, { InputInterface } from './validator';
import { Link } from 'react-router-dom';
import {
  Button,
  Box,
  Grid,
  InputLabel,
  InputBase,
  Container,
} from '@mui/material';
import styles from './styles';
import { postGuides } from '@services/guides';
import Notification from '@components/Notification';
import AccessibilityTypography from '@components/AccessibilityTypography';
import FileUploadRounded from '@mui/icons-material/FileUploadRounded';
import ClearIcon from '@mui/icons-material/Clear';
import './styles.css';
import AccessibilityContext from '@contexts/AccessibilityContext';
import { CustomTypography } from '@components/CustomTypography';

export interface RegisterGuideProps {}

export const RegisterGuide: React.FC<RegisterGuideProps> = (): JSX.Element => {
  const title = useRef<HTMLInputElement>();
  const description = useRef<HTMLInputElement>();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>({} as File);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const context = useContext(AccessibilityContext);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const cardBody = {
      title: title.current?.value || '',
      content: description.current?.value || '',
    } as { [key: string]: any };

    const formData = new FormData();

    Object.keys(cardBody).forEach((key) => {
      formData.append(key, cardBody[key]);
    });

    formData.append('file', file);

    try {
      await validateInput({ ...cardBody, file: file } as InputInterface);
      await postGuides(formData);
      setSuccess(true);
      setFile({} as File);
    } catch (error: any) {
      setErrorMessage(error.response?.data.message ?? error.message);
      setError(true);
    }

    title.current!.value = '';
    description.current!.value = '';
  }

  return (
    <>
      <Grid
        container
        alignItems={'center'}
        justifyContent={'center'}
        role="main"
      >
        <Grid item md={6} component="section">
          <Box sx={styles.header} component="header">
            <AccessibilityTypography sx={styles.headerTitle}>
              CADASTRO DE GUIA
            </AccessibilityTypography>
          </Box>
          <Box
            padding={'1rem 3rem'}
            sx={styles.content}
            component="section"
            className={
              context.colorAccessibility ? 'accessColor' : 'defaultColor'
            }
          >
            <Button
              variant="contained"
              component="label"
              sx={styles.buttonFileUpload}
            >
              <Container sx={styles.containerUpload}>
                <FileUploadRounded sx={styles.uploadIcon} />
                Selecionar um arquivo
              </Container>
              <input
                data-testid="inputFile"
                accept="image/*"
                type="file"
                hidden
                ref={fileRef}
                multiple
                onChange={(event: any) => {
                  setFile(event.target.files[0]);
                }}
              />
            </Button>
            {file.name && (
              <Box
                flexDirection={'row'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'flex-end'}
              >
                <CustomTypography component="p" fontSize={16}>
                  {file.name}
                </CustomTypography>
                <Button
                  sx={styles.clearButton}
                  aria-label={`Remover arquivo ${file.name}`}
                  onClick={() => {
                    setFile({} as File);

                    if (fileRef.current !== undefined) {
                      fileRef.current!.value = '';
                    }
                  }}
                >
                  <ClearIcon />
                </Button>
              </Box>
            )}
            {!file.name && (
              <AccessibilityTypography sx={styles.fileName}>
                Nenhum arquivo selecionado
              </AccessibilityTypography>
            )}
            <Box
              component="form"
              onSubmit={handleSubmit}
              flexDirection={'column'}
              display={'flex'}
            >
              <InputLabel
                htmlFor="titulo"
                id="tituloLabel"
                sx={styles.labelInput}
              >
                <AccessibilityTypography>Título:</AccessibilityTypography>
              </InputLabel>
              <InputBase
                inputRef={title}
                type="text"
                id="titulo"
                name="titulo"
                role="input"
                required
                aria-labelledby="tituloLabel"
                sx={styles.input}
              />
              <InputLabel
                htmlFor="descricao"
                sx={styles.labelInput}
                id="descricaoLabel"
              >
                <AccessibilityTypography>Descrição:</AccessibilityTypography>
              </InputLabel>
              <InputBase
                inputRef={description}
                multiline={true}
                minRows={5}
                role="input"
                id="descricao"
                name="descricao"
                aria-labelledby="descricaoLabel"
                required
                sx={styles.input}
              />
              <Grid
                container
                justifyContent={'space-evenly'}
                alignItems={'center'}
              >
                <Grid item md={6} sx={styles.buttonWrapper}>
                  <Button
                    sx={styles.button}
                    variant="contained"
                    type="submit"
                    role="button"
                  >
                    Salvar
                  </Button>
                </Grid>
                <Grid item md={6} sx={styles.buttonWrapper}>
                  <Button
                    sx={styles.button}
                    variant="contained"
                    type="reset"
                    role="button"
                    data-testid="back"
                    component={Link}
                    to="/admin/listar-guias"
                  >
                    Voltar
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {error && (
        <Notification
          message={`${errorMessage} 🤔`}
          variant="error"
          onClose={() => {
            setError(false);
            setErrorMessage('');
          }}
        >
          erro
        </Notification>
      )}
      {success && (
        <Notification
          message="Cadastro realizado com sucesso! ✔"
          variant="success"
          onClose={() => {
            setSuccess(false);
          }}
        >
          sucesso
        </Notification>
      )}
    </>
  );
};

export default RegisterGuide;
