import AccessibilityTypography from '@components/AccessibilityTypography';
import { CardDictionaryDbInclui } from '@components/CardDictionaryDBInclui';
import React from 'react';
import styles from './styles';

export interface MyDictionaryProps {}

export const MyDictionary: React.FC<MyDictionaryProps> = (): JSX.Element => {
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
