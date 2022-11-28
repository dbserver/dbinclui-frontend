import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../svgs/logo';
import './styles.css';
import AccessibilityTypography from '../../components/AccessibilityTypography';
import { ColorsDefault } from '@styles/colors';
import LogoAmarelo from '../svgs/logoAmarelo';
import { useTheme } from '@emotion/react';

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
    title: 'SOBRE',
    href: '/sobre',
  },
  {
    title: 'CONTATO',
    href: '/contato',
  },
];

export const Header: React.FC<HeaderProps> = (): JSX.Element => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const navigate = useNavigate();

  const handleChangePage = (
    target: React.MouseEvent<HTMLElement>['currentTarget'],
  ) => {
    setAnchorElNav(target);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const theme: any = useTheme();

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

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              disableScrollLock={true}
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
                display: { xs: 'block', md: 'none' },
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
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            className="box-links"
          >
            {MenuItems.map((item, key) => (
              <Button
                key={key}
                className="menu-item-desktop"
                data-testid={`menu-item-desktop-testid:${item.title}`}
                component={Link}
                to={item.href}
                onClick={({ currentTarget }: React.MouseEvent<HTMLElement>) =>
                  handleChangePage(currentTarget)
                }
              >
                <AccessibilityTypography color="secondary">
                  {item.title}
                </AccessibilityTypography>
              </Button>
            ))}
          </Box>

          <Box className="box-admin" sx={{ flexGrow: 0, mr: '10px' }}>
            <Tooltip
              title="Administrador"
              sx={{ width: '30px', height: '30px' }}
            >
              <IconButton
                size="large"
                sx={{ p: 0, m: '0 auto' }}
                onClick={() => navigate('admin')}
              >
                <Avatar src="/broken-image.jpg" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={false}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center"></Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
