import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Box,
  Collapse,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import navItems from '../navbar/navItems';
import logo from '../../../../../assets/logo.png';

const collapsedWidth = 80;
const expandedWidth = 240;

const Sidebar = ({ darkMode }) => {
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState({});
  const [open, setOpen] = useState(false);

  const toggleSubMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const bgColor = darkMode ? '#1E1E1E' : '#FED5CD';
  const hoverColor = darkMode ? '#333' : '#FEB4A7';
  const subHoverColor = darkMode ? '#444' : '#FFC09E';
  const textColor = darkMode ? '#FFF' : '#333';
  const borderColor = darkMode ? '#444' : '#FADBC6';

  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      sx={{
        width: open ? expandedWidth : collapsedWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? expandedWidth : collapsedWidth,
          transition: 'width 0.3s',
          boxSizing: 'border-box',
          backgroundColor: bgColor,
          borderRight: `1px solid ${borderColor}`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      <Box>
        <List>
          {/* Logo */}
          <ListItem disablePadding sx={{ justifyContent: 'center', p: 2 }}>
            <img src={logo} alt="Logo" style={{ height: 40 }} />
          </ListItem>

          {/* Navegación principal */}
          {navItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() =>
                    item.children ? toggleSubMenu(item.label) : navigate(item.path)
                  }
                  sx={{
                    '&:hover': {
                      backgroundColor: hoverColor,
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: textColor }}>{item.icon}</ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ sx: { color: textColor } }}
                    />
                  )}
                  {item.children &&
                    (openMenus[item.label] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>

              {item.children && (
                <Collapse in={openMenus[item.label]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child, i) => (
                      <ListItem disablePadding key={i}>
                        <ListItemButton
                          sx={{
                            pl: open ? 4 : 2,
                            '&:hover': {
                              backgroundColor: subHoverColor,
                            },
                          }}
                          onClick={() => navigate(child.path)}
                        >
                          <ListItemIcon sx={{ color: textColor }}>
                            {child.icon || <Box sx={{ width: 24 }} />}
                          </ListItemIcon>
                          {open && (
                            <ListItemText
                              primary={child.label}
                              primaryTypographyProps={{ sx: { color: textColor } }}
                            />
                          )}
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Parte inferior */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: open ? 'flex-start' : 'center',
          pb: 2,
          px: open ? 2 : 0,
        }}
      >
        <Tooltip title="Configuración" disableHoverListener={open}>
          <IconButton sx={{ color: textColor }}>
            <SettingsIcon />
            {open && (
              <Box component="span" sx={{ ml: 1, color: textColor }}>
                Configuración
              </Box>
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
