import React from 'react';
import { Container, List } from '@mui/material';
import { useState } from 'react';
import styles from './styles';
import Notification from '@components/Notification';

type CardProps = {
  items: JSX.Element[];
};

export const CardExpression = (props: CardProps): JSX.Element => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const items = [];
  const expressionFavorites = props.items.filter(
    (item) => item.props.isFavorite === true,
  );
  const expressionsNotFavorites = props.items.filter(
    (item) => item.props.isFavorite === false,
  );
  items.push(expressionFavorites);
  items.push(expressionsNotFavorites);

  return (
    <Container sx={styles.container} aria-label="OLHA EU AQUI">
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
      <List sx={styles.list} aria-label="listExpressions">
        {items}
      </List>
    </Container>
  );
};
