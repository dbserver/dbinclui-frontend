import React, { useRef, useState, useEffect, useContext } from 'react';
import {
  Button,
  Box,
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
import { GuideInterface, getGuides } from '@services/guides';
import {
  DigitalContentInterface,
  getDigitalContentById,
} from '@services/digitalContent';
import { CategoryInterface, getCategoriesByGuide } from '@services/categories';
import Notification from '@components/Notification';
import AccessibilityTypography from '@components/AccessibilityTypography';
import { Link, useParams } from 'react-router-dom';
import AccessibilityContext from '@contexts/AccessibilityContext';
import ImageCarroussel from '@components/ImageCarroussel';

export interface UpdateDigitalContentProps {}

export interface UpdateDigitalInterface {
  title?: string | undefined;
  content?: string | undefined;
  id?: string | undefined;
  category: string | undefined;
  shortDescription: string | undefined;
}

export const ViewDigitalContent: React.FC<
  UpdateDigitalContentProps
> = (): JSX.Element => {
  const title = useRef<HTMLInputElement>();
  const shortDescription = useRef<HTMLInputElement>();
  const parametros = useParams();
  const id: string = parametros.id!;

  const [guideId, setGuideId] = useState('');
  const [categoryId, setCategoryId] = useState('');
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

  const [digitalContent, setDigitalContent] =
    useState<DigitalContentInterface>();

  const context = useContext(AccessibilityContext);

  async function getGuidesService(id: string) {
    let data: { data: DigitalContentInterface };
    try {
      data = (await getDigitalContentById(id)).data;
      setError(false);
      setGuideText(data!.data?.guide?.title);
      setCategoryText(data!.data.category?.title);
      setCategoryId(data.data.category?._id!);
      setGuideId(data.data.guide._id!);
    } catch (error: any) {
      setError(true);
      setErrorMessage(error.response?.data.message ?? error.message);
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

  const getDigitalContentByIdService = async (id: string) => {
    try {
      const { data } = await getDigitalContentById(id);
      setDigitalContent(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getDigitalContentByIdService(id);
    getGuidesService(id);
    getDigitalContentCategories(id);
    getDigitalContentGuides();
  }, [id]);

  useEffect(() => {
    if (guideId) getDigitalContentCategories(guideId);
  }, [guideId]);

  return (
    <Grid container alignItems={'center'} justifyContent={'center'} role="main">
      <Grid item md={6} component="section">
        <Box sx={styles.header} component="header">
          <AccessibilityTypography sx={styles.headerTitle}>
            VISUALIZAR CONTEÚDO DIGITAL
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
          <Box>
            <img src={digitalContent?.filePaths[0].filePath} alt="" />
            <ImageCarroussel contents={[]} height="20rem" width="100%" />
          </Box>

          <Box component="form" flexDirection={'column'} display={'flex'}>
            <InputLabel htmlFor="guide" id="guideLabel" sx={styles.labelInput}>
              <AccessibilityTypography>Guia:</AccessibilityTypography>
            </InputLabel>

            {successGetGuides && guides.length > 0 && (
              <Select
                disabled={true}
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
                disabled={true}
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
              disabled={true}
            />
            <InputLabel
              htmlFor="description"
              sx={styles.labelInput}
              id="descriptionLabel"
            >
              <AccessibilityTypography>Descrição:</AccessibilityTypography>
            </InputLabel>
            <InputBase
              disabled={true}
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

export default ViewDigitalContent;
