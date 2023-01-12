import AccessibilityTypography from '@components/AccessibilityTypography';
import { CardExpression } from '@components/CardExpression';
import { AuthContext } from '@contexts/AuthContext';
import { CircularProgress, Grid } from '@mui/material';
import {
  deleteUserExpression,
  ExpressionInterface,
  favoriteUserExpression,
  getUsersExpressions,
} from '@services/userExpressions';
import Notification from '@components/Notification';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import styles from './styles';
import { ItemList } from '@components/CardExpression/ItemList';

export interface MyDictionaryProps {}

export const MyDictionaryPage: React.FC<
  MyDictionaryProps
> = (): JSX.Element => {
  const [expressions, setExpressions] = useState<ExpressionInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { user } = useContext(AuthContext);

  const getUsersExpressionsService = useCallback(async () => {
    try {
      setLoading(true);
      if (!user?.token) {
        throw new Error('Nenhum token foi enviado');
      }

      const { data } = await getUsersExpressions(user?.token);

      setExpressions(data?.data);
      setError(false);
      setLoading(false);
    } catch (error: any) {
      setErrorMessage(error.response?.data.message ?? error.message);
      setError(true);
      setLoading(false);
    }
  }, [user?.token]);

  useEffect(() => {
    getUsersExpressionsService();
  }, [getUsersExpressionsService]);

  if (!user) {
    return <Navigate to="/" />;
  }

  async function favoriteExpression(id: string) {
    try {
      if (!user?.token) {
        throw new Error('Nenhum token foi enviado');
      }
      await favoriteUserExpression(user?.token, id);
      getUsersExpressionsService();
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
      getUsersExpressionsService();

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
            <CardExpression
              items={expressions.map((expression, key) => {
                return (
                  <ItemList
                    key={key}
                    title={expression.expression}
                    isFavorite={expression.favorite}
                    handleFavoriteExpression={() =>
                      favoriteExpression(expression._id)
                    }
                    handleDeleteExpression={() =>
                      deleteExpression(expression._id)
                    }
                  />
                );
              })}
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

export default MyDictionaryPage;
