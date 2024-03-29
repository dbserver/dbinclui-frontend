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
import styles from './styles';
import './styles.css';
import FileUploadRounded from '@mui/icons-material/FileUploadRounded';
import ClearIcon from '@mui/icons-material/Clear';
import { GuideInterface, getGuides } from '@services/guides';
import {
  DigitalContentInterface,
  getDigitalContentById,
  putDigitalContent,
} from '@services/digitalContent';
import { CategoryInterface, getCategoriesByGuide } from '@services/categories';
import validateInput, { InputInterfaceProps } from './validator';
import Notification from '@components/Notification';
import AccessibilityTypography from '@components/AccessibilityTypography';
import { Link, useParams } from 'react-router-dom';
import { CustomTypography } from '@components/CustomTypography';
import AccessibilityContext from '@contexts/AccessibilityContext';
import { AuthContext } from '@contexts/AuthContext';

export interface UpdateDigitalContentProps {}

export interface UpdateDigitalInterface {
  title?: string | undefined;
  content?: string | undefined;
  id?: string | undefined;
  category: string | undefined;
  shortDescription: string | undefined;
}

export const UpdateDigitalContent: React.FC<
  UpdateDigitalContentProps
> = (): JSX.Element => {
  const title = useRef<HTMLInputElement>();
  const shortDescription = useRef<HTMLInputElement>();
  const fileRef = useRef<HTMLInputElement>(null);
  const parametros = useParams();
  const id: string = parametros.id!;

  const [guideId, setGuideId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [mediaURL, setMediaURL] = useState('');
  const [previousMediaURL, setPreviousMediaURL] = useState('');
  const [mediaType, setMediaType] = useState<'img' | 'video'>('img');
  const [file, setFile] = useState<File>({} as File);
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
  const [, setGuideText] = useState<string | undefined>('');
  const [, setCategoryText] = useState<string | undefined>('');

  const context = useContext(AccessibilityContext);
  const { user } = useContext(AuthContext);

  async function getGuidesService(id: string) {
    let data: { data: DigitalContentInterface };
    try {
      data = (await getDigitalContentById(id)).data;
      setMediaURL(data.data.filePaths[0].filePath);
      mediaTyping(data.data.filePaths[0].filePath);
      setError(false);
      setGuideText(data!.data?.guide?.title);
      setCategoryText(data!.data.category?.title);
      setCategoryId(data.data.category?._id!);
      setGuideId(data.data.guide._id!);
    } catch (error: any) {
      setError(true);
      setErrorMessage(error.response?.data.message[0].msg ?? error.message);
    } finally {
      title.current!.value = data!.data.title;
      shortDescription.current!.value = data!.data.shortDescription;
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
    } finally {
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
    } finally {
    }
  };

  useEffect(() => {
    getGuidesService(id);
    getDigitalContentCategories(id);
    getDigitalContentGuides();
  }, [id]);

  useEffect(() => {
    if (guideId) getDigitalContentCategories(guideId);
  }, [guideId]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const cardBody = {
      title: title.current?.value || '',
      shortDescription: shortDescription.current?.value || '',
      guide: guideId || '',
      category: categoryId || '',
    } as { [key: string]: any };

    const formData = new FormData();

    Object.keys(cardBody).forEach((key) => {
      formData.append(key, cardBody[key]);
    });

    formData.append('files', file);

    try {
      await validateInput({ ...cardBody, file: file } as InputInterfaceProps);
      await putDigitalContent(id, formData, user!.token);
      setSuccess(true);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response?.data.message ?? error.message);
      setError(true);
    }
  }

  const changeIMG = (event: any) => {
    const fileTarget = event.target.files[0];
    if (!previousMediaURL) setPreviousMediaURL(mediaURL);
    setFile(fileTarget);
    setMediaURL(URL.createObjectURL(fileTarget));
    mediaTyping(fileTarget.name);
  };

  const mediaTyping = (fileExtension: string) => {
    let media = fileExtension.split('.').pop();
    let typeMatch: 'img' | 'video' = media?.match(/png|jpg|jpeg|gif/)
      ? 'img'
      : 'video';

    setMediaType(typeMatch);
  };

  return (
    <Grid container alignItems={'center'} justifyContent={'center'} role="main">
      <Grid item md={6} component="section">
        <Box sx={styles.header} component="header">
          <AccessibilityTypography sx={styles.headerTitle}>
            ATUALIZAR CONTEÚDO DIGITAL
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
          <Grid item justifyContent={'center'} display="flex">
            <Box
              role="media"
              aria-label={'media do conteúdo digital'}
              tabIndex={1}
              component={mediaType}
              controls={mediaType === 'video'}
              sx={{
                minWidth: '15rem',
                width: '80%',
                maxHeight: '28rem',
                borderRadius: '1.25rem',
                mb: 2,
                mt: '30px',
              }}
              src={mediaURL}
            />
          </Grid>
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
              onChange={changeIMG}
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
                aria-label="botão excluir"
                sx={styles.clearButton}
                onClick={() => {
                  setFile({} as File);
                  setMediaURL(previousMediaURL);
                  mediaTyping(previousMediaURL);

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

            {successGetGuides && guides.length > 0 && (
              <Select
                labelId="guideLabel"
                required
                data-testid="guideTestId"
                role="select"
                aria-labelledby="guideLabel"
                name="guide"
                id="guide"
                sx={[styles.input, styles.select]}
                value={guideId}
                onChange={(event) => {
                  setGuideId(event.target.value);
                  setCategoryId('');
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
                labelId="categoryLabel"
                data-testid="categoryTestId"
                role="select"
                aria-labelledby="categoryLabel"
                name="category"
                id="category"
                sx={[styles.input, styles.select]}
                value={categoryId}
                onChange={(event) => {
                  setCategoryId(event.target.value);
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
              inputProps={{ minLength: 1, maxLength: 32 }}
            />
            <InputLabel
              htmlFor="description"
              sx={styles.labelInput}
              id="descriptionLabel"
            >
              <AccessibilityTypography>Descrição:</AccessibilityTypography>
            </InputLabel>
            <InputBase
              inputRef={shortDescription}
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
          message="Atualização realizada com sucesso! ✔"
          variant="success"
          onClose={() => {
            setSuccess(false);
            window.location.reload();
          }}
        />
      )}
    </Grid>
  );
};

export default UpdateDigitalContent;
