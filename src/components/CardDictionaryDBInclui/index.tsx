import React from 'react';
import {
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { AuthContext } from '@contexts/AuthContext';
import { useContext } from 'react';
import styles from './styles';
import { Box } from '@mui/system';
import AccessibilityContext from '@contexts/AccessibilityContext';
import { ExpressionInterface } from '@services/userExpressions';
import Notification from '@components/Notification';

export type Props = {
  expression: ExpressionInterface[];
  functionFavoriteExpression: (id: string) => void;
  functionDeleteExpression: (id: string) => void;
};

export const CardDictionaryDbInclui = (props: Props): JSX.Element => {
  const { user } = useContext(AuthContext);
  const { colorAccessibility } = useContext(AccessibilityContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Container sx={styles.container}>
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
      <List sx={styles.list}>
        {props.expression.map((item, index) => (
          <ListItem
            sx={
              !colorAccessibility
                ? styles.listItem
                : styles.listItemAccessibility
            }
            key={index}
          >
            <ListItemText primary={item.expression} />
            <Box sx={styles.BoxIcon}>
              <IconButton
                onClick={() => {
                  if (user) {
                    props.functionFavoriteExpression(item._id);
                  } else if (!user) {
                    setErrorMessage(
                      'Você precisa estar logado para adicionar ao seu dicionário pessoal',
                    );
                  }
                }}
              >
                {item.favorite ? (
                  <FavoriteIcon sx={{ color: 'red' }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: 'grey' }} />
                )}
              </IconButton>
              <IconButton
                onClick={() => {
                  if (user) {
                    props.functionDeleteExpression(item._id);
                  } else if (!user) {
                    setErrorMessage(
                      'Você precisa estar logado para deletar uma expression',
                    );
                  }
                }}
              >
                <DeleteIcon
                  sx={
                    colorAccessibility ? { color: 'white' } : { color: 'black' }
                  }
                />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
