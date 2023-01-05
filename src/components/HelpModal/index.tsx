import React, { useContext } from 'react';
import { Box, ButtonBase, Menu } from '@mui/material';
import { CustomTypography } from '@components/CustomTypography';
import AccessibilityContext from '@contexts/AccessibilityContext';
import { useStyles } from './styles';
import { useNavigate } from 'react-router-dom';

interface HelpModalProps {
  anchorElHelpModal: null | HTMLElement;
  setAnchorElHelpModal: (a: null | HTMLElement) => void;
}

export const HelpModal = ({
  anchorElHelpModal,
  setAnchorElHelpModal,
}: HelpModalProps) => {
  const isAccessibility = useContext(AccessibilityContext).colorAccessibility;
  const classes = useStyles();
  const navigate = useNavigate();

  const handleCloseHelpModal = () => {
    setAnchorElHelpModal(null);
  };

  return (
    <Menu
      id="help-modal"
      className={
        isAccessibility ? classes.helpModalContrast : classes.helpModal
      }
      anchorEl={anchorElHelpModal}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElHelpModal)}
      onClose={handleCloseHelpModal}
      sx={{
        top: 4,
      }}
      disableScrollLock={false}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: '16px 28px',
          gap: '6px',
        }}
      >
        <ButtonBase
          sx={{
            'p': '8px 38px',
            'borderRadius': '10px',
            'transition': 'all 0.3s',
            'display': 'flex',
            'gap': '14px',
            ':hover': {
              backgroundColor: '#EFF0F6',
            },
          }}
          onClick={() => {
            navigate('/contato');
            handleCloseHelpModal();
          }}
        >
          <CustomTypography
            fontSize={16}
            component="p"
            color={isAccessibility ? '#000' : '#909090'}
          >
            Contato
          </CustomTypography>
        </ButtonBase>
        <ButtonBase
          sx={{
            'p': '8px 38px',
            'borderRadius': '10px',
            'transition': 'all 0.3s',
            'display': 'flex',
            'gap': '14px',
            ':hover': {
              backgroundColor: '#EFF0F6',
            },
          }}
          onClick={() => {
            navigate('/sobre');
            handleCloseHelpModal();
          }}
        >
          <CustomTypography
            fontSize={16}
            component="p"
            color={isAccessibility ? '#000' : '#909090'}
          >
            Sobre
          </CustomTypography>
        </ButtonBase>
      </Box>
    </Menu>
  );
};

export default HelpModal;
