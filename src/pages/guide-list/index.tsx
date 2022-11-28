import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef, ptBR } from '@mui/x-data-grid';
import { Button, Box, CircularProgress, Grid } from '@mui/material';
import AccessibilityTypography from '@components/AccessibilityTypography';
import { deleteGuide, GuideInterface, getGuides } from '@services/guides';
import { CreateSharp } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './styles';
import './styles.css';
import DialogBoxConfirmation from '@components/DialogBox/DialogBoxConfirmation';
import Notification from '@components/Notification';
import { CustomTypography } from '@components/CustomTypography';
import AccessibilityContext from '@contexts/AccessibilityContext';


export interface GuideListPropsInterfaceProps {}

export const GuideList: React.FC<
  GuideListPropsInterfaceProps
> = (): JSX.Element => {
  const [guideList, setGuideList] = useState<GuideInterface[]>([]);
  const [errorGetList, setErrorGetList] = useState(false);

  const [loading, setLoading] = useState(true);
  const [confirmation, setConfirmation] = useState(false);
  const [id, setId] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const context = useContext(AccessibilityContext);


  async function getGuideListService() {
    try {
      const { data } = await getGuides();
      setGuideList(data.data);
    } catch {
      setErrorGetList(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(value: boolean) {
    if (value) {
      try {
        await deleteGuide(id);
        setSuccess(true);
      } catch (error: any) {
        setErrorMessage(error.response.data.message);
        setError(true);
      }
    }
  }

  useEffect(() => {
    getGuideListService();
  }, [success]);

  const columns: GridColDef[] = [
    {
      field: 'image',
      width: 100,
      renderHeader: () => (
        <CustomTypography component={'p'} fontSize={14}>
          Imagem
        </CustomTypography>
      ),
      renderCell: (params) => (
        <img
          src={params.value}
          width={100}
          height={50}
          alt="Imagem do card do guia"
        />
      ),
    },
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
      field: 'content',
      width: 470,
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
          data-testid="edit"
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
          data-testid="delete"
          onClick={() => {
            setConfirmation(true);
            setId(params.value);
          }}
          startIcon={<DeleteIcon />}
          sx={{ color: 'text.primary' }}
        ></Button>
      ),
    },
  ];

  const rowData = guideList.map((card) => {
    return {
      _id: card._id,
      guide: card.title,
      content:
        card.content.length > 65
          ? card.content.substring(0, 65) + '...'
          : card.content,
      image: card.filePaths.filePath,
      edit: '/admin/atualizar-guia/' + card._id,
      delete: card._id,
    };
  });

  return (
    <>
      {confirmation && (
        <Box>
          <DialogBoxConfirmation
            title="Deseja excluir esse guia?"
            confirmation={confirmation}
            setConfirmation={setConfirmation}
            onClose={handleDelete}
          />
        </Box>
      )}

      <AccessibilityTypography
        role="heading"
        tabIndex={0}
        aria-label="LISTAGEM DE GUIAS"
        sx={styles.listTitle}
      >
        LISTAGEM DE GUIAS
      </AccessibilityTypography>
      <Box
        style={{ height: 400, width: '100%' }}
        role="list"
        tabIndex={2}
        aria-label="LISTA DE GUIAS"
      >
        {loading ? (
          <Grid container justifyContent={'center'} marginTop={'20px'}>
            <CircularProgress color="secondary" />
          </Grid>
        ) : errorGetList ? (
          <Grid container justifyContent={'center'} marginTop={'30px'}>
            <AccessibilityTypography variant="h1" className="error">
              Desculpe, não foi possível carregar a lista de guias!
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
              rowsPerPageOptions={[10]}
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
              className={
                context.colorAccessibility ? 'accessColor' : 'defaultColor'
              }
            />
            <Box sx={styles.boxButton}>
              <Button
                data-testid="new"
                component={Link}
                to="/admin/cadastrar-guia"
                sx={styles.button}
                variant="contained"
                type="submit"
                role="button"
                aria-label="BOTÃO NOVO"
                tabIndex={3}
              >
                Novo
              </Button>

              <Button
                sx={styles.button}
                variant="contained"
                type="reset"
                role="button"
                data-testid="back"
                component={Link}
                to="/admin"
                aria-label="BOTÃO VOLTAR"
                tabIndex={0}
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
            message="Guia deletada com sucesso! ✔"
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

export default GuideList;
