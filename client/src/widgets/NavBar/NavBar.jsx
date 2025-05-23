import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

export default function NavBar({ logoutHandler, user }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  const logoPath = user.status === 'logged' ? '/theme' : '/signup'

  const navbar = {
    background: 'linear-gradient(45deg,#ffcd69, #e0e9ee, #89df8f, #ff7d97)',
    padding: '0.4rem 1rem',
    color: '#333',
    fontFamily: 'Segoe UI, sans-serif',
    borderBottom: '4px solid #ff7d97',
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={navbar}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          
          {/* Левая часть — логотип */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => handleNavigate(logoPath)}
          >
            <img src="/favicon.png" alt="LOGO" style={{ width: '50px' }} />
          </Box>

          {/* Правая часть — имя и бургер */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ marginRight: 2 }}>
              {user?.data?.name || 'Гость'}
            </Typography>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={() => handleNavigate('/progress')}>
                Мой прогресс
              </MenuItem>
              <MenuItem onClick={() => handleNavigate('/myWords')}>
                Мои слова
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logoutHandler();
                  handleNavigate('/login');
                }}
              >
                Выйти
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
