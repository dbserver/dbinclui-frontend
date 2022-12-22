import React, { useContext } from 'react';
import { Box, ButtonBase, Menu } from '@mui/material';
import { CustomTypography } from '@components/CustomTypography';
import AccessibilityContext from '@contexts/AccessibilityContext';
import { useStyles } from './styles';


interface SignoutModalProps {
    anchorElSigninModal: null | HTMLElement;
    setAnchorElSigninModal: (a: null | HTMLElement) => void;
}

export const SignoutModal = ({
    anchorElSigninModal,
    setAnchorElSigninModal,
}: SignoutModalProps) => {

    const isAccessibility = useContext(AccessibilityContext).colorAccessibility;
    const classes = useStyles();

    const handleCloseSigninModal = () => {
        setAnchorElSigninModal(null);
    };

    return (
        <Menu
            id="logout-modal"
            className={
                isAccessibility ? classes.logInModalContrast : classes.logInModal
            }
            disableScrollLock={true}
            anchorEl={anchorElSigninModal}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElSigninModal)}
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
                }}
            >
                <CustomTypography
                    color={isAccessibility ? '#000' : '#221F52'}
                    fontWeight={500}
                    fontSize={20}
                    component="p"
                >
                    OlÃ¡, Usuário!
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