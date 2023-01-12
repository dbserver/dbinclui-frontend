import { CustomTypography } from '@components/CustomTypography';
import GoogleLogo from '@components/svgs/googleLogo';
import AccessibilityContext from '@contexts/AccessibilityContext';
import useGoogleLogin from '@hooks/useGoogleLogin';
import { Box, ButtonBase, Menu } from '@mui/material';
import React, { useContext } from 'react';
import { useStyles } from './styles';

interface SignInModalProps {
  anchorElSignInModal: null | HTMLElement;
  setAnchorElSignInModal: (e: null | HTMLElement) => void;
}

export const SignInModal = ({
  anchorElSignInModal,
  setAnchorElSignInModal,
}: SignInModalProps) => {
  const isAccessibility = useContext(AccessibilityContext).colorAccessibility;
  const classes = useStyles();

  const { signInWithGoogle } = useGoogleLogin();

  const handleCloseSignInModal = () => {
    setAnchorElSignInModal(null);
  };
  return (
    <Menu
      id="login-modal"
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
      onClose={handleCloseSignInModal}
      sx={{ display: 'flex', top: 4 }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: '24px 24px',
          gap: '18px',
        }}
      >
        <CustomTypography
          color={isAccessibility ? '#000' : '#221F52'}
          fontWeight={500}
          fontSize={20}
          component="p"
        >
          Faça Login{' '}
        </CustomTypography>

        <ButtonBase
          sx={{
            'p': '14px',
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
            signInWithGoogle();
            handleCloseSignInModal();
          }}
        >
          <GoogleLogo />
          <CustomTypography
            component="p"
            fontSize={16}
            color={isAccessibility ? '#000' : '#909090'}
          >
            Continuar com Google
          </CustomTypography>
        </ButtonBase>
      </Box>
    </Menu>
  );
};
