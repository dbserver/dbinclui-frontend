import React, { useState, useRef, useEffect } from 'react';
import validateInput, { InputInterface } from './validator';
import {
  Button,
  Box,
  Grid,
  InputLabel,
  InputBase,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './styles';
import { GuideInterface, putGuides, getGuideById } from '@services/guides';
import Notification from '@components/Notification';
import AccessibilityTypography from '@components/AccessibilityTypography';
import { useParams } from 'react-router-dom';
import { FileUploadRounded } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';

export interface UpdateGuideProps {}

export interface UpdateGuideInterface {
  title?: string | undefined;
  content?: string | undefined;
  id?: string | undefined;
}

export const UpdateGuide: React.FC<UpdateGuideProps> = (): JSX.Element => {
  const title = useRef<HTMLInputElement | undefined>();
  const description = useRef<HTMLInputElement | undefined>();
  const parametros = useParams();
  const id: string = parametros.id!;
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>({} as File);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function getGuidesService(id: string) {
    let data: { data: GuideInterface } = {} as { data: GuideInterface };
    try {
      setLoading(true);
      data = (await getGuideById(id)).data;
      setError(false);
    } catch (error: any) {
      setError(true);
      setErrorMessage(error.response?.data.message ?? error.message);
    } finally {
      setLoading(false);
      if (data.data) {
        if (title.current) {
          title.current!.value = data!.data.title;
        }

        if (description.current) {
          description.current!.value = data!.data.content;
        }
      }
    }
  }

  useEffect(() => {
    getGuidesService(id);
  }, [id]);

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
      await putGuides(id, formData);
      setSuccess(true);
    } catch (error: any) {
      setErrorMessage(error.message);
      setError(true);
    }
  }

  return (
    <>
      <Grid
        container
        alignItems={'center'}
        justifyContent={'center'}
        role="main"
      >
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <Grid item md={6} component="section">
            <Box sx={styles.header} component="header">
              <AccessibilityTypography sx={styles.headerTitle}>
                ATUALIZAR GUIA
              </AccessibilityTypography>
            </Box>
            <Box padding={'1rem 3rem'} sx={styles.content} component="section">
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
                >
                  <Typography sx={styles.fileName}>{file.name}</Typography>
                  <Button
                    sx={styles.clearButton}
                    onClick={() => {
                      setFile({} as File);

                      if (fileRef.current !== undefined) {
                        fileRef.current!.value = '';
                      }
                    }}
                  >
                    <ClearIcon />{' '}
                  </Button>
                </Box>
              )}
              {!file.name && (
                <AccessibilityTypography
                  sx={styles.fileName}
                  data-testid="IndexFileTest"
                >
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
                      Atualizar
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
        )}
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
          message="Atualização realizada com sucesso! ✔"
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

export default UpdateGuide;
