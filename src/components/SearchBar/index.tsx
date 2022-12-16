import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import styles from './styles';

interface SearchBarProps {
  inputRef: React.RefObject<HTMLInputElement>;
  filterFunc: () => void;
  handleEnterKey: (e: any) => void;
}

export const SearchBar = ({
  inputRef,
  filterFunc,
  handleEnterKey,
}: SearchBarProps) => {
  return (
    <>
      <Paper component="form" aria-label="Barra de Pesquisa" sx={styles.input}>
        <InputBase
          sx={styles.inputPlaceholder}
          aria-label="Botão de Busca"
          placeholder="Localizar Guia..."
          inputRef={inputRef}
          onKeyDown={handleEnterKey}
        />
        <IconButton
          type="button"
          sx={styles.inputSearchIcon}
          aria-label="search"
          onClick={filterFunc}
        >
          <SearchIcon titleAccess="Botão de Busca" />
        </IconButton>
      </Paper>
    </>
  );
};
