import React, { useState, useContext } from 'react';
import { Box, Button, Modal } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import Counter from '../Counter';
import { AccessibilityContext } from '@contexts/AccessibilityContext';
import styles from './styles';
import UseCounter from '@hooks/Counter';

export interface AccessibilityToolsProps {
  handleClickContrastButton: () => void;
}

export const AccessibilityTools: React.FC<AccessibilityToolsProps> = ({
  handleClickContrastButton,
}): JSX.Element => {
  const [modalOpen, setModalOpen] = useState(false);
  const [colorModalButton, setColorModalButton] = useState(true);

  const renderArrowIcon = () =>
    modalOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />;

  const handleCounter = (counter: number) => {
    contextAcessibility.dispatch({
      ...contextAcessibility.state,
      fontSizeScale: counter,
    });
  };

  const useCounter = UseCounter({
    handleCounter,
    limiters: [1, 2],
  });

  const contextAcessibility = useContext(AccessibilityContext);

  const handleClick = () => {
    setColorModalButton(!colorModalButton);
  };

  const { colorAccessibility, setColorAccessibility } =
    useContext(AccessibilityContext);

  return (
    <>
      <Box sx={styles.widgetAccessibilityTools}>
        <Box>
          <Button
            sx={{
              'width': '100%',
              'color': 'text.secundary',
              '&:hover': {
                color: '#221f52',
              },
            }}
            onClick={() => {
              setModalOpen(!modalOpen);
              handleClick();
            }}
            startIcon={renderArrowIcon()}
          >
            Acessibilidade
          </Button>
        </Box>
      </Box>
      {modalOpen && (
        <Modal open={modalOpen} onClose={() => setModalOpen(!modalOpen)}>
          <Fade in={modalOpen}>
            <Box sx={styles.modalAccessibilityTools}>
              <div>
                <Counter {...useCounter} />
              </div>
              <Button
                onClick={() => {
                  handleClickContrastButton();
                  setColorAccessibility(!colorAccessibility);
                }}
                variant="contained"
                aria-label="Mudar contraste da tela"
                sx={{
                  left: '10px',
                  top: '10px',
                  width: '90%',
                  borderRadius: '20px',
                  fontSize: '14px',
                  color: 'secondary.main',
                }}
              >
                Contrastes
              </Button>
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
};

export default AccessibilityTools;
