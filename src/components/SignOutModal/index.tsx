import React, { useContext } from 'react';
import { Box, ButtonBase, Menu } from '@mui/material';
import { CustomTypography } from '@components/CustomTypography';
import AccessibilityContext from '@contexts/AccessibilityContext';
import { useStyles, styles } from './styles';
import useGoogleLogin from '@hooks/useGoogleLogin';
import { AuthContext } from '@contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SignoutModalProps {
  anchorElSignInModal: null | HTMLElement;
  setAnchorElSignInModal: (a: null | HTMLElement) => void;
}

export const SignoutModal = ({
  anchorElSignInModal,
  setAnchorElSignInModal,
}: SignoutModalProps) => {
  const { user } = useContext(AuthContext);
  const { signOutWithGoogle } = useGoogleLogin();

  const isAccessibility = useContext(AccessibilityContext).colorAccessibility;
  const classes = useStyles();

  const handleCloseSigninModal = () => {
    setAnchorElSignInModal(null);
  };

  const navigate = useNavigate();

  return (
    <Menu
      id="logout-modal"
      className={
        isAccessibility ? classes.logInModalContrast : classes.logInModal
      }
      disableScrollLock={false}
      anchorEl={anchorElSignInModal}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElSignInModal)}
      onClose={handleCloseSigninModal}
      sx={{
        display: 'flex',
        top: 4,
      }}
    >
      <Box sx={styles.boxStyles}>
        <CustomTypography
          color={isAccessibility ? '#000' : '#221F52'}
          fontWeight={500}
          fontSize={20}
          component="p"
          maxWidth="20ch"
          textAlign="center"
        >
          Olá, {user?.displayName}!
        </CustomTypography>
        <ButtonBase
          sx={styles.button}
          onClick={() => {
            navigate('meu-dicionario');
          }}
        >
          <CustomTypography
            fontSize={18}
            component="p"
            color={isAccessibility ? '#000' : '#909090'}
            fontWeight={500}
          >
            Meu dicionário
          </CustomTypography>
        </ButtonBase>

        <ButtonBase
          sx={styles.button}
          onClick={() => {
            signOutWithGoogle();
            handleCloseSigninModal();
          }}
        >
          <CustomTypography
            fontSize={16}
            component="p"
            color={isAccessibility ? '#000' : '#909090'}
          >
            Sair
          </CustomTypography>
        </ButtonBase>
      </Box>
    </Menu>
  );
};

export default SignoutModal;
