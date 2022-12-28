import React, { useContext } from 'react';
import { Box, ButtonBase, Menu } from '@mui/material';
import { CustomTypography } from '@components/CustomTypography';
import AccessibilityContext from '@contexts/AccessibilityContext';
import { useStyles } from './styles';
import useGoogleLogin from '@hooks/useGoogleLogin';
import { AuthContext } from '@contexts/AuthContext';

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

  return (
    <Menu
      id="logout-modal"
      className={
        isAccessibility ? classes.logInModalContrast : classes.logInModal
      }
      disableScrollLock={true}
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: '24px 46px',
          gap: '18px',
          wordBreak: 'break-word',
        }}
      >
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
          sx={{
            'p': '14px 94px',
            'borderRadius': '10px',
            'boxShadow': 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
            'transition': 'all 0.3s',
            'display': 'flex',
            'gap': '14px',
            ':hover': {
              backgroundColor: '#EFF0F6',
            },
          }}
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
