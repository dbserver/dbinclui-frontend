import AccessibilityTypography from '@components/AccessibilityTypography';
import { CardDictionaryDbInclui } from '@components/CardDictionaryDBInclui';
import { AuthContext } from '@contexts/AuthContext';
import { CircularProgress, Grid } from '@mui/material';
import {
  deleteUserExpression,
  ExpressionInterface,
  favoriteUserExpression,
  getUsersExpressions,
} from '@services/userExpressions';
import Notification from '@components/Notification';
import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import styles from './styles';

export interface MyDictionaryProps {}

export const MyDictionary: React.FC<MyDictionaryProps> = (): JSX.Element => {
  const [expressions, setExpressions] = useState<ExpressionInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { user } = useContext(AuthContext);

  const userLogout = () => {
    setError(true);
    setErrorMessage(
      'Você precisa efetuar o login para armazenar no seu dicionario pessoal',
    );
  };

  async function getUsersExpressionsService() {
    try {
      if (!user) {
        userLogout();
        return;
      }

      if (!user?.token) {
        throw new Error('Nenhum token foi enviado');
      }

      const { data } = await getUsersExpressions(user?.token);

      setExpressions(data?.data);
      setError(false);
    } catch (error: any) {
      setErrorMessage(error.response?.data.message ?? error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsersExpressionsService();
  }, []);

  if (!user) {
    return <Navigate to="/"></Navigate>;
  }

  async function favoriteExpression(id: string) {
    try {
      if (!user?.token) {
        throw new Error('Nenhum token foi enviado');
      }

      await favoriteUserExpression(user?.token, id);
      setError(false);
    } catch (error: any) {
      setErrorMessage(error.response?.data.message ?? error.message);
      setError(true);
    }
  }

  async function deleteExpression(id: string) {
    try {
      if (!user?.token) {
        throw new Error('Nenhum token foi enviado');
      }

      await deleteUserExpression(user?.token, id);
      setError(false);
    } catch (error: any) {
      setErrorMessage(error.response?.data.message ?? error.message);
      setError(true);
    }
  }

  return (
    <>
      <AccessibilityTypography sx={styles.headingDictionaryDBInclui}>
        Meu Dicionário
      </AccessibilityTypography>

      <Grid item md={12}>
        <Grid container justifyContent={'center'}>
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
          {loading ? (
            <CircularProgress color="secondary" />
          ) : expressions.length > 0 ? (
            <CardDictionaryDbInclui
              functionDeleteExpression={deleteExpression}
              functionFavoriteExpression={favoriteExpression}
              expression={expressions}
            />
          ) : (
            <AccessibilityTypography variant="h1" className="error">
              Nenhuma expressão encontrada!
            </AccessibilityTypography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default MyDictionary;
