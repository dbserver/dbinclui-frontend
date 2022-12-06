import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import styles from './styles';

export const SearchBar = () => {
    return (
        <>
            <Paper
                component="form"
                aria-label='Barra de Pesquisa'
                sx={
                    styles.input
                }
            >
                <InputBase
                    sx={
                        styles.inputPlaceholder
                    }
                    aria-label='Botão de Busca'
                    placeholder='Localizar Guia...'
                />
                <IconButton type="button" sx={styles.inputSearchIcon} aria-label="search">
                    <SearchIcon titleAccess='Botão de Busca' />
                </IconButton>
            </Paper>
        </>
    );
};