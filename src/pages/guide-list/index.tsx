import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef, ptBR } from '@mui/x-data-grid';
import { Button, Box, CircularProgress, Grid } from '@mui/material';
import AccessibilityTypography from '@components/AccessibilityTypography';
import { GuideInterface, getGuides, patchGuide } from '@services/guides';
import { CreateSharp } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './styles';
import './styles.css';
import DialogBoxConfirmation from '@components/DialogBox/DialogBoxConfirmation';
import Notification from '@components/Notification';
import { CustomTypography } from '@components/CustomTypography';
import AccessibilityContext from '@contexts/AccessibilityContext';
import { AuthContext } from '@contexts/AuthContext';


export interface GuideListPropsInterfaceProps { }

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
  const { user } = useContext(AuthContext);


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
        await patchGuide(id, user!.token);
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
      width: user ? 250 : 300,
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
      width: user ? 470 : 610,
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
          data-testid="edit"
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
          data-testid="delete"
          onClick={() => {
            setConfirmation(true);
            setId(params.value.guideId);
          }}
          startIcon={<DeleteIcon titleAccess="Botão de excluir" />}
          sx={{ color: 'text.primary' }}
          disabled={user!.admin ? false : user!.uid !== params.value.authorId}
        ></Button>
      ),
    },
  ];

  const handleRowData = (guideData: any) => {
    let newRowData = [];
    for(let i = 0; i < guideData.length; i++){
      if(!guideData[i].deleted){
        let guide = guideData[i];

        newRowData.push(
          {
            _id: guide._id,
            guide: guide.title,
            content:
              guide.content.length > 65
                ? guide.content.substring(0, 65) + '...'
                : guide.content,
            image: guide.filePaths.filePath,
            edit: '/admin/atualizar-guia/' + guide._id,
            delete: { authorId: guide.author.uid, guideId: guide._id }
          }
        )

      }
    }
    return newRowData;
  }

  const rowData = handleRowData(guideList);

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
              columnBuffer={5}
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
              {user && <Button
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
              </Button>}

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
