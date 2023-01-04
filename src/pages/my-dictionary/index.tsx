import AccessibilityTypography from '@components/AccessibilityTypography';
import { CardDictionaryDbInclui } from '@components/CardDictionaryDBInclui';
import { AuthContext } from '@contexts/AuthContext';
import {
  ExpressionInterface,
  getUsersExpressions,
} from '@services/userExpressions';
import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import styles from './styles';

export interface MyDictionaryProps {}

export const MyDictionary: React.FC<MyDictionaryProps> = (): JSX.Element => {
  const [expressions, setExpressions] = useState<ExpressionInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { user } = useContext(AuthContext);

  async function getUsersExpressionsService() {
    try {
      const { data } = await getUsersExpressions();
      setExpressions(data.data);
      setError(false);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return <Navigate to="/"></Navigate>;
  }
  return (
    <>
      <AccessibilityTypography sx={styles.headingDictionaryDBInclui}>
        Meu Dicionário
      </AccessibilityTypography>

      <CardDictionaryDbInclui
        expression={[
          'Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor',
          'Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor',
          'Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor',
          'Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor',
          'Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor Lorem Ipsum dolor',
          'Expression 6',
          'Expression 7',
          'Expression 8',
          'Expression 9',
          'Expression 10',
          'Expression 11',
          'Expression 12',
        ]}
      />
    </>
  );
};

export default MyDictionary;
