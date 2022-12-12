import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef, ptBR } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import AccessibilityTypography from '@components/AccessibilityTypography';
import styles from './styles';
import './styles.css';
import {
  deleteDigitalContent,
  DigitalContentInterface,
  getDigitalContent,
} from '@services/digitalContent';
import { CreateSharp } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogBoxConfirmation from '@components/DialogBox/DialogBoxConfirmation';
import Notification from '@components/Notification';
import { CustomTypography } from '@components/CustomTypography';
import AccessibilityContext from '@contexts/AccessibilityContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { FormEvent, ChangeEvent } from 'react';
import type { IrowData } from '@interfaces/IrowData';
export interface DigitalContentInterfaceProps {}

export const ListDigitalContent: React.FC<
  DigitalContentInterfaceProps
> = (): JSX.Element => {
  const [digitalContents, setDigitalContents] = useState<
    DigitalContentInterface[]
  >([]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const [confirmation, setConfirmation] = useState(false);
  const [id, setId] = useState('');
  const context = useContext(AccessibilityContext);

  async function getDigitalContentsService() {
    try {
      const { data } = await getDigitalContent();
      setDigitalContents(data.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(value: boolean) {
    if (value) {
      try {
        await deleteDigitalContent(id);
        setSuccess(true);
      } catch (error: any) {
        setErrorMessage(error.response.data.message);
        setError(true);
      }
    }
  }

  useEffect(() => {
    getDigitalContentsService();
  }, [success]);

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 50, hide: true },
    {
      field: 'guide',
      width: 250,
      renderHeader: () => (
        <CustomTypography component={'p'} fontSize={14}>
          Guia
        </CustomTypography>
      ),
      renderCell: (params) => (
        <CustomTypography component={'p'} fontSize={14}>
          {params.value}
        </CustomTypography>
      ),
    },
    {
      field: 'category',
      width: 250,
      renderHeader: () => (
        <CustomTypography component={'p'} fontSize={14}>
          Categoria
        </CustomTypography>
      ),
      renderCell: (params) => (
        <CustomTypography component={'p'} fontSize={14}>
          {params.value}
        </CustomTypography>
      ),
    },
    {
      field: 'shortDescription',
      width: 280,
      renderHeader: () => (
        <CustomTypography component={'p'} fontSize={14}>
          Descrição
        </CustomTypography>
      ),
      renderCell: (params) => (
        <CustomTypography component={'p'} fontSize={14}>
          {params.value}
        </CustomTypography>
      ),
    },
    {
      field: 'filePaths',
      width: 120,
      renderHeader: () => (
        <CustomTypography component={'p'} fontSize={14}>
          Arquivos
        </CustomTypography>
      ),
      renderCell: (params) => (
        <img
          src={params.value}
          width={100}
          height={50}
          alt="Imagem referente ao conteúdo digital."
        />
      ),
    },
    {
      field: 'view',
      width: 100,
      renderHeader: () => (
        <CustomTypography component={'p'} fontSize={14}>
          Visualizar
        </CustomTypography>
      ),
      renderCell: (params) => (
        <Button
          href={params.value}
          startIcon={<VisibilityIcon titleAccess="Botão de visualizar" />}
          sx={{ color: 'text.primary' }}
          aria-label="visualizar"
        ></Button>
      ),
    },
    {
      field: 'edit',
      width: 100,
      sortable: false,
      renderHeader: () => (
        <CustomTypography component={'p'} fontSize={14}>
          Editar
        </CustomTypography>
      ),
      renderCell: (params) => (
        <Button
          href={params.value}
          startIcon={<CreateSharp titleAccess="Botão de editar" />}
          sx={{ color: 'text.primary' }}
        ></Button>
      ),
    },
    {
      field: 'delete',
      width: 100,
      sortable: false,
      renderHeader: () => (
        <CustomTypography component={'p'} fontSize={14}>
          Excluir
        </CustomTypography>
      ),
      renderCell: (params) => (
        <Button
          onClick={() => {
            setConfirmation(true);
            setId(params.value);
          }}
          startIcon={<DeleteIcon titleAccess="Botão de excluir" />}
          sx={{ color: 'text.primary' }}
        ></Button>
      ),
    },
  ];

  const rowData: IrowData = digitalContents.map((card) => {
    return {
      _id: card._id,
      guide:
        card.guide.title.length > 30
          ? card.guide.title.substring(0, 30) + '...'
          : card.guide.title,
      category:
        card.category?.title.length! > 30
          ? card.category?.title.substring(0, 30) + '...'
          : card.category?.title,
      shortDescription:
        card.shortDescription.length > 30
          ? card.shortDescription.substring(0, 30) + '...'
          : card.shortDescription,
      filePaths: card.filePaths[0].filePath,
      view: '/admin/visualizar-conteudo-digital/' + card._id,
      edit: '/admin/atualizar-conteudo-digital/' + card._id,
      delete: card._id,
    };
  });
  const [searchInput, setSearchInput] = useState('');
  const [query, setQuery] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuery(removeCharacters(searchInput));
  }

  function removeCharacters(word?: string) {
    if (!word) {
      return '';
    }
    return word
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  function filterContent(data: IrowData) {
    return [...data].filter((row) => {
      return (
        removeCharacters(row.category).includes(query) ||
        removeCharacters(row.guide).includes(query) ||
        removeCharacters(row.shortDescription).includes(query)
      );
    });
  }
  return (
    <>
      {confirmation && (
        <Box>
          <DialogBoxConfirmation
            title="Deseja excluir esse conteúdo digital?"
            confirmation={confirmation}
            setConfirmation={setConfirmation}
            onClose={handleDelete}
          />
        </Box>
      )}
      <AccessibilityTypography variant="h2" sx={styles.listTitle}>
        LISTAGEM DE CONTEÚDO DIGITAL
      </AccessibilityTypography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid
          container
          direction={'row'}
          justifyContent="center"
          alignItems="center"
          margin={1}
        >
          <Grid item>
            <FormControl sx={styles.FormControl}>
              <TextField
                placeholder="Pesquise sua Categoria..."
                value={searchInput}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setSearchInput(event.target.value)
                }
                InputProps={{ disableUnderline: true }}
                variant="standard"
                sx={
                  context.colorAccessibility
                    ? styles.TextFieldAccessibility
                    : context.colorAccessibility
                    ? styles.TextFieldAccessibility
                    : styles.TextField
                }
              />
            </FormControl>
          </Grid>
          <Grid item>
            <IconButton type="submit">
              <SearchIcon
                sx={context.colorAccessibility ? { color: '#fff000' } : null}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Box>

      <Box>
        {loading ? (
          <Grid container justifyContent={'center'} marginTop={'20px'}>
            <CircularProgress color="secondary" />
          </Grid>
        ) : error ? (
          <Grid container justifyContent={'center'} marginTop={'30px'}>
            <AccessibilityTypography variant="h1" className="error">
              Desculpe, não foi possível carregar a lista de Conteúdo Digital!
            </AccessibilityTypography>
          </Grid>
        ) : (
          <>
            <DataGrid
              data-testid="dataGrid"
              autoHeight
              getRowId={(row) => row._id}
              disableExtendRowFullWidth={true}
              rows={filterContent(rowData)}
              columns={columns}
              columnBuffer={columns.length}
              sx={styles.table}
              pageSize={10}
              rowsPerPageOptions={[10]}
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              className={
                context.colorAccessibility ? 'accessColor' : 'defaultColor'
              }
            />

            <Box sx={styles.buttonBox}>
              <Button
                data-testid="new"
                component={Link}
                to="/admin/cadastrar-conteudo-digital"
                sx={styles.button}
                variant="contained"
                type="submit"
                role="button"
                aria-label="BOTÃO NOVO"
                tabIndex={16}
              >
                Novo
              </Button>
              <Button
                data-testid="back"
                component={Link}
                to="/admin"
                sx={styles.button}
                variant="contained"
                type="reset"
                role="button"
                aria-label="BOTÃO VOLTAR"
                tabIndex={17}
              >
                Voltar
              </Button>
            </Box>
          </>
        )}
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
            message="Conteúdo digital deletado com sucesso! ✔"
            variant="success"
            onClose={() => {
              setSuccess(false);
            }}
          />
        )}
      </Box>
    </>
  );
};
export default ListDigitalContent;
