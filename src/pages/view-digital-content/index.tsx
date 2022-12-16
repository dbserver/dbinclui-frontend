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
import AccessibilityTypography from '@components/AccessibilityTypography';
import { Link, useParams } from 'react-router-dom';
import AccessibilityContext from '@contexts/AccessibilityContext';

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
      setGuideText(data!.data?.guide?.title);
      setCategoryText(data!.data.category?.title);
      setCategoryId(data.data.category?._id!);
      setGuideId(data.data.guide._id!);
    } catch (error: any) {
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

  const fileExtension = digitalContent?.filePaths[0].filePath.split('.').pop();
  const mediaType = fileExtension?.match(/png|jpg|jpeg|gif/) ? 'img' : 'video';

  return (
    <Grid container alignItems={'center'} justifyContent={'center'} role="main">
      <Grid item md={6} component="section">
        <Box sx={styles.header} component="header">
          <AccessibilityTypography sx={styles.headerTitle}>
            VISUALIZAR CONTEÚDO DIGITAL
          </AccessibilityTypography>
        </Box>
        <Box
          border={'solid 2px red'}
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
              src={digitalContent?.filePaths[0].filePath}
              sx={{
                minWidth: '15rem',
                width: '80%',
                maxHeight: '28rem',
                borderRadius: '1.25rem',
                mb: 2,
              }}
            />
          </Grid>

          <Box component="form" flexDirection={'column'} display={'flex'}>
            <InputLabel htmlFor="guide" id="guideLabel" sx={styles.labelInput}>
              <AccessibilityTypography>Guia:</AccessibilityTypography>
            </InputLabel>

            {successGetGuides && guides.length > 0 && (
              <Select
                readOnly={true}
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
                readOnly={true}
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
              readOnly={true}
            />
            <InputLabel
              htmlFor="description"
              sx={styles.labelInput}
              id="descriptionLabel"
            >
              <AccessibilityTypography>Descrição:</AccessibilityTypography>
            </InputLabel>
            <InputBase
              readOnly={true}
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
    </Grid>
  );
};

export default ViewDigitalContent;
