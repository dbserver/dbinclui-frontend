import AccessibilityTypography from '@components/AccessibilityTypography';
import { CardExpression } from '@components/CardExpression';

import React, { useCallback, useContext, useEffect, useState } from 'react';
import styles from './styles';
import { getDbExpression } from '@services/dbExpressions';
import { deleteExpression } from '@services/dbExpressions';
import { IDBExpression } from '@interfaces/IDBExpression';
import { ItemList } from '@components/CardExpression/ItemList';
import { AuthContext } from '@contexts/AuthContext';
export interface IDictionary_DbInclui {}

export const DictionaryDbinclui: React.FC<
  IDictionary_DbInclui
> = (): JSX.Element => {
  const { user } = useContext(AuthContext);
  const [expressions, setExpressions] = useState<IDBExpression[]>([]);
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

  const favoriteExpression = () => {};

  const deleteExpressionDB = async (id: string) => {
    try {
      await deleteExpression(id, user!.token);
      requestExpressions();
    } catch (error) {
      console.log(error);
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
            isFavorite={item.favoriteOf.includes(item.author) ? true : false}
            handleFavoriteExpression={favoriteExpression}
            handleDeleteExpression={() => {
              deleteExpressionDB(item._id);
            }}
          />
        ))}
      />
    </>
  );
};
