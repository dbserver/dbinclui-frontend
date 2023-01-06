import React from 'react';
import { useContext } from 'react';
import AccessibilityContext from '@contexts/AccessibilityContext';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import styles from './styles';
import { Box } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';

type ItemProps = {
  title: string;
  isFavorite: boolean;
  handleFavoriteExpression: () => void;
  handleDeleteExpression: () => void;
};

export const ItemList = (props: ItemProps) => {
  const { colorAccessibility } = useContext(AccessibilityContext);

  return (
    <ListItem
      sx={!colorAccessibility ? styles.listItem : styles.listItemAccessibility}
    >
      <ListItemText primary={props.title} />
      <Box sx={styles.BoxIcon}>
        <IconButton onClick={props.handleFavoriteExpression}>
          {props.isFavorite ? (
            <FavoriteIcon sx={{ color: 'red' }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: 'grey' }} />
          )}
        </IconButton>
        <IconButton onClick={props.handleDeleteExpression}>
          <DeleteIcon
            sx={colorAccessibility ? { color: 'white' } : { color: 'black' }}
          />
        </IconButton>
      </Box>
    </ListItem>
  );
};
