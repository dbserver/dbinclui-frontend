import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  Button,
  Box,
  Grid,
  InputLabel,
  InputBase,
  Select,
  MenuItem,
  Alert,
  Stack,
} from '@mui/material';
import AccessibilityTypography from '@components/AccessibilityTypography';
import { Link } from 'react-router-dom';
import styles from './styles';
import './styles.css';
import Notification from '@components/Notification';
import validateInput from './validator';
import { GuideInterface, getGuides } from '@services/guides';
import { postCategories } from '@services/categories';
import AccessibilityContext from '@contexts/AccessibilityContext';

export interface RegisterCategoryProps {}

export const RegisterCategory: React.FC<
  RegisterCategoryProps
> = (): JSX.Element => {
  const description = useRef<HTMLInputElement>();
  const [guide, setGuide] = useState('');
  const [guides, setGuides] = useState<GuideInterface[]>([]);
  const title = useRef<HTMLInputElement>();

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successGetGuides, setSuccessGetGuides] = useState(false);
  const [errorGetGuides, setErrorGetGuides] = useState(false);
  const [errorMessageGetGuides, setErrorMessageGetGuides] = useState('');
  const context = useContext(AccessibilityContext);

  async function getGuidesService() {
    try {
      const response = await getGuides();
      setGuides(response.data.data);
      setSuccessGetGuides(true);
    } catch {
      setErrorMessageGetGuides('Não foram encontradas as guias');
      setErrorGetGuides(true);
    }
  }

  useEffect(() => {
    getGuidesService();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const cardBody = {
      title: title.current?.value || '',
      shortDescription: description.current?.value || '',
      guide: guide || '',
    };

    try {
      await validateInput(cardBody);
      await postCategories(cardBody);
      setSuccess(true);
      title.current!.value = '';
      description.current!.value = '';
      setGuide('');
    } catch (error: any) {
      setErrorMessage(error.response?.data.message ?? error.message);
      setError(true);
    }
  }

  return (
    <Grid container alignItems={'center'} justifyContent={'center'} role="main">
      <Grid item md={6} component="section">
        <Box sx={styles.header} component="header">
          <AccessibilityTypography sx={styles.headerTitle}>
            CADASTRO DE CATEGORIA
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
          <Box
            onSubmit={handleSubmit}
            component="form"
            flexDirection={'column'}
            display={'flex'}
            id="boxForm"
          >
            <InputLabel htmlFor="guide" id="guideLabel" sx={styles.labelInput}>
              <AccessibilityTypography>Guia:</AccessibilityTypography>
            </InputLabel>
            {successGetGuides && (
              <Select
                defaultValue=""
                labelId="guideLabel"
                required
                value={guide}
                data-testid="guideTestId"
                role="select"
                aria-labelledby="guideLabel"
                name="guide"
                id="guide"
                sx={[styles.input, styles.select]}
                onChange={(event) => {
                  setGuide(event.target.value);
                }}
              >
                {guides.map((guide, index) => (
                  <MenuItem
                    key={index}
                    value={guide._id}
                    role="option"
                    aria-labelledby="itensLabel"
                    sx={styles.menuItem}
                  >
                    {guide.title}
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
            <InputBase
              inputRef={title}
              type="text"
              id="category"
              name="category"
              role="input"
              required
              data-testid="categoryTestId"
              aria-labelledby="categoryLabel"
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
                  to="/admin/listar-categorias"
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

export default RegisterCategory;
