import AccessibilityTypography from '@components/AccessibilityTypography';
import { CardExpression } from '@components/CardExpression';

import React, { useCallback, useContext, useEffect, useState } from 'react';
import styles from './styles';
import { favoriteExpression, getDbExpression } from '@services/dbExpressions';
import { deleteExpression } from '@services/dbExpressions';
import { IDBExpression } from '@interfaces/IDBExpression';
import { ItemList } from '@components/CardExpression/ItemList';
import { AuthContext } from '@contexts/AuthContext';
import Notification from '@components/Notification';
export interface IDictionary_DbInclui {}

export const DictionaryDbinclui: React.FC<
  IDictionary_DbInclui
> = (): JSX.Element => {
  const { user } = useContext(AuthContext);
  const [expressions, setExpressions] = useState<IDBExpression[]>([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const requestExpressions = useCallback(async () => {
    try {
      const { data } = await getDbExpression();
      setExpressions(data?.data);
    } catch (error: any) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    requestExpressions();
  }, [requestExpressions]);

  const userLogout = (message: string) => {
    setError(true);
    setErrorMessage(message);
  };

  const favoriteExpressionDB = async (id: string) => {
    try {
      if (!user) {
        userLogout('mensagem do favorite');
        return;
      }
      await favoriteExpression(id, user!.token);
      requestExpressions();
    } catch (error: any) {
      setErrorMessage(error.response?.data.message ?? error.message);
      setError(true);
    }
  };

  const deleteExpressionDB = async (id: string) => {
    try {
      if (!user) {
        userLogout('mensagem do delete');
        return;
      }
      await deleteExpression(id, user!.token);
      requestExpressions();
    } catch (error: any) {
      setErrorMessage(error.response?.data.message ?? error.message);
      setError(true);
    }
  };

  return (
    <>
      <AccessibilityTypography sx={styles.headingDictionaryDBInclui}>
        Dicionario DBInclui
      </AccessibilityTypography>

      <CardExpression
        items={expressions?.map((item) => (
          <ItemList
            key={item._id}
            title={item.expression}
            isFavorite={item.favoriteOf.includes(user?._id!) ? true : false}
            handleFavoriteExpression={() => {
              favoriteExpressionDB(item._id);
            }}
            handleDeleteExpression={() => {
              deleteExpressionDB(item._id);
            }}
          />
        ))}
      />

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
    </>
  );
};
