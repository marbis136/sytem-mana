import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Avatar,
  Typography,
  Box,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';  // 🌙 Modo oscuro
import Brightness7Icon from '@mui/icons-material/Brightness7';  // ☀️ Modo claro
import NotificationIcon from '@mui/icons-material/NotificationAddRounded';
import navItems from './navItems';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuItems, setSubmenuItems] = useState([]);

  const handleMenuOpen = (event, children) => {
    setAnchorEl(event.currentTarget);
    setSubmenuItems(children);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubmenuItems([]);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: darkMode ? '#333' : '#FADBC6',
        color: darkMode ? '#fff' : '#333',
        boxShadow: 'none',
        borderBottom: darkMode ? '1px solid #444' : '1px solid #FFC09E',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Navegación */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {navItems.map((item, index) =>
            item.children ? (
              <Button key={index} color="inherit" onClick={(e) => handleMenuOpen(e, item.children)} sx={{ textTransform: 'none' }}>
                {item.label}
              </Button>
            ) : (
              <Button key={index} color="inherit" onClick={() => navigate(item.path)} sx={{ textTransform: 'none' }}>
                {item.label}
              </Button>
            )
          )}

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{ onMouseLeave: handleClose }}
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: darkMode ? '#444' : '#fff',
                color: darkMode ? '#fff' : '#333',
              },
              '& .MuiMenuItem-root:hover': {
                backgroundColor: darkMode ? '#555' : '#FED5CD',
              },
            }}
          >
            {submenuItems.map((subItem, subIndex) => (
              <MenuItem
                key={subIndex}
                onClick={() => {
                  navigate(subItem.path);
                  handleClose();
                }}
              >
                {subItem.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Acciones */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title={darkMode ? 'Modo claro' : 'Modo oscuro'}>
            <IconButton color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Notificación">
            <IconButton color="inherit">
              <NotificationIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Santiago Guerrero
          </Typography>
          <Avatar alt="Santiago Guerrero" src="/avatar.jpg" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
