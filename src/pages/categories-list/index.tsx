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
  patchCategories,
} from '@services/categories';
import DialogBoxConfirmation from '@components/DialogBox/DialogBoxConfirmation';
import DeleteIcon from '@mui/icons-material/Delete';
import { CreateSharp } from '@mui/icons-material';
import Notification from '@components/Notification';
import { CustomTypography } from '@components/CustomTypography';
import { GuideInterface } from '@services/guides';
import AccessibilityContext from '@contexts/AccessibilityContext';
import { AuthContext } from '@contexts/AuthContext';

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
  const { user } = useContext(AuthContext);

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
        await patchCategories(id, user!.token);
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
      width: user ? 250 : 300,
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
      width: user ? 230 : 300,
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
      width: user ? 300 : 370,
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
      filterable: false,
      disableColumnMenu: true,
      hide: user ? false : true,
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
          data-testid="edit"
        ></Button>
      ),
    },
    {
      field: 'delete',
      width: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      hide: user ? false : true,
      renderHeader: () => (
        <CustomTypography component={'p'} fontSize={14}>
          Excluir
        </CustomTypography>
      ),
      renderCell: (params) => (
        <Button
          onClick={() => {
            setConfirmation(true);
            setId(params.value.categoryId);
          }}
          startIcon={<DeleteIcon titleAccess="Botão de excluir" />}
          sx={{ color: 'text.primary' }}
          data-testid="delete"
          disabled={user!.admin ? false : user!.uid !== params.value.authorId}
        ></Button>
      ),
    },
  ];

  const handleRowData = (categoryData: any) => {
    let newRowData = [];
    for (let i = 0; i < categoryData.length; i++) {
      if (!categoryData[i].deleted) {
        let category = categoryData[i];

        newRowData.push({
          _id: category._id,
          guide: (category.guide as GuideInterface).title,
          title: category.title,
          shortDescription:
            category.shortDescription.length >= 30
              ? category.shortDescription.substring(0, 30) + '...'
              : category.shortDescription,
          edit: '/admin/atualizar-categoria/' + category._id,
          delete: { categoryId: category._id, authorId: category.author.uid },
        });
      }
    }

    return newRowData;
  };

  const rowData = handleRowData(categories);

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
              columnBuffer={7}
              rowBuffer={10}
              getRowId={(row) => row._id}
              disableExtendRowFullWidth={true}
              disableColumnSelector={true}
              rows={rowData}
              columns={columns}
              sx={styles.table}
              pageSize={10}
              rowsPerPageOptions={[10]}
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              className={
                context.colorAccessibility ? 'accessColor' : 'defaultColor'
              }
            />
            <Box sx={styles.boxButton}>
              {user && (
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
              )}

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
