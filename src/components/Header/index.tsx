import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import Logo from '../svgs/logo';
import './styles.css';
import AccessibilityTypography from '../../components/AccessibilityTypography';
import { ColorsDefault } from '@styles/colors';
import LogoAmarelo from '../svgs/logoAmarelo';
import { useTheme } from '@emotion/react';
import { AuthContext } from '@contexts/AuthContext';
import SignoutModal from '@components/SignOutModal';
import { SignInModal } from '@components/SignInModal';
import AccessibilityContext from '@contexts/AccessibilityContext';
import useVerifyLogedUser from '@hooks/useVerifyLogedUser';
import { HelpOutline } from '@mui/icons-material';
import HelpModal from '@components/HelpModal';

export interface HeaderProps {}

export interface MenuItemsInterface {
  title: string;
  href: string;
}

export const MenuItems: MenuItemsInterface[] = [
  {
    title: 'HOME',
    href: '/',
  },
  {
    title: 'TRADUTOR DE LIBRAS',
    href: '/tradutor-de-libras',
  },
  {
    title: 'DICIONÁRIO DBINCLUI',
    href: '/dictionaryDbInclui',
  },
  {
    title: 'MANTER CONTEÚDOS',
    href: '/admin',
  },
];

export const Header: React.FC<HeaderProps> = (): JSX.Element => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const [anchorElSignInModal, setAnchorElSignInModal] =
    React.useState<null | HTMLElement>(null);

  const [anchorElHelpModal, setAnchorElHelpModal] =
    React.useState<null | HTMLElement>(null);

  const { user } = React.useContext(AuthContext);
  const { verifyLogedGoogleUser, loadingUser } = useVerifyLogedUser();

  const isAccessibility =
    React.useContext(AccessibilityContext).colorAccessibility;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenSignInModal = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSignInModal(event.currentTarget);
  };

  const handleOpenHelpModal = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElHelpModal(event.currentTarget);
  };

  const theme: any = useTheme();

  React.useEffect(() => {
    verifyLogedGoogleUser();
  }, []);

  return (
    <AppBar
      role="header"
      position="static"
      className="app-header"
      elevation={0}
    >
      <Container>
        <Toolbar disableGutters className="toolbar">
          <Box
            component={Link}
            to="/"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            title="Logo"
          >
            <Box sx={{ mt: '10px', mb: '10px' }}>
              {theme.palette.background.default === ColorsDefault.PRIMARY ? (
                <Logo />
              ) : (
                <LogoAmarelo />
              )}
            </Box>
          </Box>

          {/*MENU HAMBURGUER*/}

          <Box
            sx={{
              marginLeft: 2,
              flexGrow: 1,
              display: { xs: 'flex', lg: 'none' },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: 'secondary.light' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              disableScrollLock={false}
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', lg: 'none' },
              }}
            >
              {MenuItems.map((item, key) => (
                <MenuItem key={key}>
                  <Box
                    textAlign="center"
                    className="menu-item-mobile"
                    data-testid={`menu-item-mobile-testid:${item.title}`}
                    component={Link}
                    to={item.href}
                    sx={{ color: 'text.primary', textDecoration: 'none' }}
                  >
                    <AccessibilityTypography>
                      {item.title}
                    </AccessibilityTypography>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/*MENU DESKTOP*/}

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', lg: 'flex' },
              justifyContent: 'center',
            }}
            className="box-links"
          >
            {MenuItems.map((item, key) => (
              <Button
                key={key}
                className="menu-item-desktop"
                data-testid={`menu-item-desktop-testid:${item.title}`}
                component={Link}
                to={item.href}
              >
                <AccessibilityTypography color="secondary">
                  {item.title}
                </AccessibilityTypography>
              </Button>
            ))}
          </Box>

          <Box
            className="box-login"
            sx={{
              flexGrow: 0,
              mr: '10px',
              ml: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Tooltip title="Ajuda" sx={{ width: '28px', height: '28px' }}>
              <span>
                <IconButton
                  aria-label="Botão de ajuda"
                  size="small"
                  sx={{ p: 0, m: '0 auto' }}
                  onClick={handleOpenHelpModal}
                >
                  <HelpOutline
                    htmlColor={isAccessibility ? '#FFFF00' : '#565C9B'}
                  />
                </IconButton>
              </span>
            </Tooltip>

            <HelpModal
              anchorElHelpModal={anchorElHelpModal}
              setAnchorElHelpModal={setAnchorElHelpModal}
            />

            <Tooltip
              title="Menu de Usuário"
              sx={{ width: '30px', height: '30px' }}
            >
              <span>
                <IconButton
                  size="large"
                  sx={{ p: 0, m: '0 auto' }}
                  onClick={handleOpenSignInModal}
                  disabled={loadingUser}
                >
                  <Avatar
                    src={user ? user.photoURL! : '/broken-image.jpg'}
                    imgProps={{ referrerPolicy: 'no-referrer' }}
                  />
                </IconButton>
              </span>
            </Tooltip>

            {user ? (
              <SignoutModal
                anchorElSignInModal={anchorElSignInModal}
                setAnchorElSignInModal={setAnchorElSignInModal}
              />
            ) : (
              <SignInModal
                anchorElSignInModal={anchorElSignInModal}
                setAnchorElSignInModal={setAnchorElSignInModal}
              />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
