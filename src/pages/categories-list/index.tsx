import React, { useContext, useEffect, useState } from 'react';
import { DataGrid, GridColDef, ptBR } from '@mui/x-data-grid';
import AccessibilityTypography from '@components/AccessibilityTypography';
import styles from './styles';
import './styles.css';
import { Box, Button, CircularProgress, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  CategoryInterface,
  getCategories,
  deleteCategory,
} from '@services/categories';
import DialogBoxConfirmation from '@components/DialogBox/DialogBoxConfirmation';
import DeleteIcon from '@mui/icons-material/Delete';
import { CreateSharp } from '@mui/icons-material';
import Notification from '@components/Notification';
import { CustomTypography } from '@components/CustomTypography';
import { GuideInterface } from '@services/guides';
import AccessibilityContext from '@contexts/AccessibilityContext';

export interface CategoriesListProps {}

export const CategoriesList: React.FC<
  CategoriesListProps
> = (): JSX.Element => {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [errorGetCategories, setErrorGetCategories] = useState(false);
  const [loading, setLoading] = useState(true);

  const [confirmation, setConfirmation] = useState(false);
  const [id, setId] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const context = useContext(AccessibilityContext);


  async function getContentCategories() {
    try {
      const { data } = await getCategories();
      setCategories(data.data);
    } catch {
      setErrorGetCategories(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(value: boolean) {
    if (value) {
      try {
        await deleteCategory(id);
        setSuccess(true);
      } catch (error: any) {
        setErrorMessage(error.response.data.message);
        setError(true);
      }
    }
  }

  useEffect(() => {
    getContentCategories();
  }, [success]);

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 300, hide: true },
    {
      field: 'guide',
      width: 250,
      editable: false,
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
      field: 'title',
      width: 200,
      editable: false,
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
      width: 300,
      editable: false,
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
          startIcon={<CreateSharp />}
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
          startIcon={<DeleteIcon />}
          sx={{ color: 'text.primary' }}
          data-testid="excluir"
        ></Button>
      ),
    },
  ];

  const rowData = categories.map((category) => {
    return {
      _id: category._id,
      guide: (category.guide as GuideInterface).title,
      title: category.title,
      shortDescription:
        category.shortDescription.length >= 30
          ? category.shortDescription.substring(0, 30) + '...'
          : category.shortDescription,
      edit: '/admin/atualizar-categoria/' + category._id,
      delete: category._id,
    };
  });

  return (
    <>
      {confirmation && (
        <Box>
          <DialogBoxConfirmation
            title="Deseja excluir essa categoria?"
            confirmation={confirmation}
            setConfirmation={setConfirmation}
            onClose={handleDelete}
          />
        </Box>
      )}
      <AccessibilityTypography
        role="heading"
        tabIndex={1}
        aria-label="LISTAGEM DE CATEGORIAS"
        sx={styles.listTitle}
      >
        LISTAGEM DE CATEGORIAS
      </AccessibilityTypography>
      <Box
        style={{ width: '100%' }}
        role="list"
        tabIndex={2}
        aria-label="LISTA DE CATEGORIAS"
      >
        {loading ? (
          <Grid container justifyContent={'center'} marginTop={'20px'}>
            <CircularProgress color="secondary" />
          </Grid>
        ) : errorGetCategories ? (
          <Grid container justifyContent={'center'} marginTop={'30px'}>
            <AccessibilityTypography variant="h1" className="error">
              Desculpe, não foi possível carregar a lista de categorias!
            </AccessibilityTypography>
          </Grid>
        ) : (
          <>
            <DataGrid
              data-testid="dataGrid"
              autoHeight
              getRowId={(row) => row._id}
              disableExtendRowFullWidth={true}
              rows={rowData}
              columns={columns}
              sx={styles.table}
              pageSize={10}
              rowsPerPageOptions={[4]}
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              className={
                context.colorAccessibility ? 'accessColor' : 'defaultColor'
              }
            />
            <Box sx={styles.boxButton}>
              <Button
                component={Link}
                to="/admin/cadastrar-categoria"
                sx={styles.button}
                variant="contained"
                type="submit"
                role="button"
                aria-label="BOTÃO NOVO"
                tabIndex={16}
                data-testid="new"
              >
                Novo
              </Button>

              <Button
                component={Link}
                to="/admin"
                sx={styles.button}
                variant="contained"
                type="reset"
                role="button"
                aria-label="BOTÃO VOLTAR"
                tabIndex={17}
                data-testid="back"
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
            message="Categoria deletada com sucesso! ✔"
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

export default CategoriesList;
