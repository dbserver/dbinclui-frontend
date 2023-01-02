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

export type Props = {
  expression: String[];
};

export const CardDictionaryDbInclui = (props: Props): JSX.Element => {
  const [favorite, setFavorite] = useState(false);
  const { user } = useContext(AuthContext);
  const { colorAccessibility } = useContext(AccessibilityContext);
  const deleteExpression = (index: number) => {
    console.log(`cliquei no item de index ${index}, e removi!`);
  };
  const favoriteExpression = () => {
    setFavorite((prev) => !prev);
    if (favorite) {
      console.log('Essa expressão foi salva no seu dicionario pessoal!');
    } else {
      console.log('Essa expressão foi removida do seu dicionário pessoal');
    }
  };
  return (
    <Container sx={styles.container}>
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
            <ListItemText primary={item} />
            <Box sx={styles.BoxIcon}>
              <IconButton
                onClick={() => {
                  if (user) {
                    favoriteExpression();
                  } else if (!user) {
                    console.log(
                      'você precisa estar logado para adicionar ao seu dicionário pessoal',
                    );
                  }
                  favoriteExpression();
                }}
              >
                {
                  favorite
                    ? <FavoriteIcon sx={{ color: 'red' }} />
                    : <FavoriteBorderIcon sx={{ color: 'grey' }} />
                }
              </IconButton>
              <IconButton
                onClick={() => {
                  if (user) {
                    deleteExpression(index);
                  } else if (!user) {
                    console.log(
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
