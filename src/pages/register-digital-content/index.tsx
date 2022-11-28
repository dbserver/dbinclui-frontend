import React, { useRef, useState, useEffect, useContext } from 'react';
import {
  Button,
  Box,
  Container,
  Grid,
  InputLabel,
  InputBase,
  Select,
  MenuItem,
  Stack,
  Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './styles';
import './styles.css';
import FileUploadRounded from '@mui/icons-material/FileUploadRounded';
import ClearIcon from '@mui/icons-material/Clear';
import { GuideInterface, getGuides } from '@services/guides';
import { postDigitalContent } from '@services/digitalContent';
import { CategoryInterface, getCategoriesByGuide } from '@services/categories';
import validateInput, { InputInterfaceProps } from './validator';
import Notification from '@components/Notification';
import AccessibilityTypography from '@components/AccessibilityTypography';
import { CustomTypography } from '@components/CustomTypography';
import AccessibilityContext from '@contexts/AccessibilityContext';

export interface RegisterDigitalContentProps {}

export const RegisterDigitalContent: React.FC<
  RegisterDigitalContentProps
> = (): JSX.Element => {
  const [guide, setGuide] = useState('');
  const [category, setCategory] = useState('');
  const title = useRef<HTMLInputElement>();
  const description = useRef<HTMLInputElement>();
  const fileRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [guides, setGuides] = useState<GuideInterface[]>([]);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successGetGuides, setSuccessGetGuides] = useState(false);
  const [errorGetGuides, setErrorGetGuides] = useState(false);
  const [errorMessageGetGuides, setErrorMessageGetGuides] = useState('');
  const [successGetCategories, setSuccessGetCategories] = useState(false);
  const [errorGetCategories, setErrorGetCategories] = useState(true);
  const [errorMessageGetCategories, setErrorMessageGetCategories] =
    useState('');
  const context = useContext(AccessibilityContext);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const cardBody = {
      title: title.current?.value || '',
      shortDescription: description.current?.value || '',
      guide: guide || '',
      category: category || '',
    } as { [key: string]: any };

    const formData = new FormData();

    Object.keys(cardBody).forEach((key) => {
      formData.append(key, cardBody[key]);
    });

    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      await validateInput({ ...cardBody, file: files } as InputInterfaceProps);
      await postDigitalContent(formData);
      setSuccess(true);
      title.current!.value = '';
      description.current!.value = '';
      fileRef.current!.value = '';
      setGuide('');
      setCategory('');
      setFiles([]);
      setCategories([]);
      setSuccessGetCategories(false);
      setErrorGetCategories(true);
    } catch (error: any) {
      setErrorMessage(error.response?.data.message ?? error.message);
      setError(true);
    }
  }

  const getDigitalContentCategories = async (id: string) => {
    try {
      const { data } = await getCategoriesByGuide(id);
      setCategories(data.data);
      setSuccessGetCategories(true);
      setErrorGetCategories(false);
    } catch {
      setErrorMessageGetCategories('Não foram encontradas as categorias');
      setErrorGetCategories(true);
    }
  };

  const getDigitalContentGuides = async () => {
    try {
      const { data } = await getGuides();
      setGuides(data.data);
      setSuccessGetGuides(true);
    } catch {
      setErrorMessageGetGuides('Não foram encontradas as guias');
      setErrorGetGuides(true);
    }
  };

  useEffect(() => {
    getDigitalContentGuides();
    setErrorGetCategories(true);
    setErrorMessageGetCategories('Escolha o Guia');
  }, []);

  return (
    <Grid container alignItems={'center'} justifyContent={'center'} role="main">
      <Grid item md={6} component="section">
        <Box sx={styles.header} component="header">
          <AccessibilityTypography sx={styles.headerTitle}>
            CADASTRO DE CONTEÚDO DIGITAL
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
            sx={styles.buttonDigitalContent}
          >
            <Container sx={styles.containerUpload}>
              <FileUploadRounded sx={styles.uploadIcon} />
              Selecionar um arquivo
            </Container>
            <input
              data-testid="inputFile"
              accept="image/*, video/*"
              type="file"
              hidden
              ref={fileRef}
              multiple
              onChange={(event: any) => {
                setFiles([...files, ...event.target.files]);
              }}
            />
          </Button>
          {files.map((file, index) => (
            <Box
              key={index}
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
                  const newFiles = files.filter((file2, index2) => {
                    return index2 !== index;
                  });

                  setFiles([...newFiles]);

                  if (!newFiles.length && fileRef.current !== undefined) {
                    fileRef.current!.value = '';
                  }
                }}
              >
                <ClearIcon />
              </Button>
            </Box>
          ))}
          {!files.length && (
            <AccessibilityTypography sx={styles.fileName}>
              Nenhum arquivo selecionado
            </AccessibilityTypography>
          )}

          <Box
            onSubmit={handleSubmit}
            component="form"
            flexDirection={'column'}
            display={'flex'}
          >
            <InputLabel htmlFor="guide" id="guideLabel" sx={styles.labelInput}>
              <AccessibilityTypography>Guia:</AccessibilityTypography>
            </InputLabel>

            {successGetGuides && (
              <Select
                defaultValue=""
                value={guide}
                labelId="guideLabel"
                required
                data-testid="guideTestId"
                role="select"
                aria-labelledby="guideLabel"
                name="guide"
                id="guide"
                sx={[styles.input, styles.select]}
                onChange={(event) => {
                  getDigitalContentCategories(event.target.value);
                  setGuide(event.target.value);
                }}
              >
                {guides.map((guides, index) => (
                  <MenuItem
                    key={index}
                    value={guides._id}
                    data-testid="guideItensTestId"
                    role="option"
                    aria-labelledby="itensLabel"
                    sx={styles.menuItem}
                  >
                    {guides.title}
                  </MenuItem>
                ))}
              </Select>
            )}
            {errorGetGuides && (
              <Stack spacing={2}>
                <Alert severity="error">{errorMessageGetGuides}</Alert>
              </Stack>
            )}
            <InputLabel
              htmlFor="category"
              id="categoryLabel"
              sx={styles.labelInput}
            >
              <AccessibilityTypography>Categoria:</AccessibilityTypography>
            </InputLabel>
            {successGetCategories && (
              <Select
                defaultValue=""
                value={category}
                labelId="categoryLabel"
                data-testid="categoryTestId"
                role="select"
                aria-labelledby="categoryLabel"
                name="category"
                id="category"
                sx={[styles.input, styles.select]}
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
              >
                {categories.map((cat, index) => (
                  <MenuItem
                    key={index}
                    value={cat._id}
                    data-testid="categoryItensTestId"
                    role="option"
                    aria-labelledby="itensLabel"
                    sx={styles.menuItem}
                  >
                    {cat.title}
                  </MenuItem>
                ))}
              </Select>
            )}
            {errorGetCategories && (
              <Stack spacing={2}>
                <Alert severity="error">{errorMessageGetCategories}</Alert>
              </Stack>
            )}
            <InputLabel htmlFor="title" id="titleLabel" sx={styles.labelInput}>
              <AccessibilityTypography>Título:</AccessibilityTypography>
            </InputLabel>
            <InputBase
              inputRef={title}
              type="text"
              id="title"
              name="title"
              role="input"
              required
              data-testid="titleTestId"
              aria-labelledby="titleLabel"
              sx={styles.input}
            />
            <InputLabel
              htmlFor="description"
              sx={styles.labelInput}
              id="descriptionLabel"
            >
              <AccessibilityTypography>Descrição:</AccessibilityTypography>
            </InputLabel>
            <InputBase
              inputRef={description}
              multiline={true}
              minRows={5}
              role="input"
              id="description"
              name="description"
              aria-labelledby="descriptionLabel"
              data-testid="descriptionTestId"
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
                  data-testid="submit"
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
                  to="/admin/listar-conteudo-digital"
                >
                  Voltar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      {error && (
        <Notification
          message={`${errorMessage} 🤔`}
          variant="error"
          onClose={() => {
            setError(false);
            setErrorMessage('');
          }}
        />
      )}
      {success && (
        <Notification
          message="Cadastro realizado com sucesso! ✔"
          variant="success"
          onClose={() => {
            setSuccess(false);
          }}
        />
      )}
    </Grid>
  );
};

export default RegisterDigitalContent;
