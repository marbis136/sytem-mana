import { useState, useContext } from "react";
import { AppBar, Toolbar, IconButton, Typography, Box, useMediaQuery } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import NotificationsPopover from "../Header/NotificationsPopover";
import ProfilePopover from "../Header/ProfilePopover";
import SettingsDrawer from "../Header/SettingsDrawer";
import SearchBar from "../../components/SearchBar";
import { ConfigContext } from "contexts/ConfigContext";

import logoMana from "../../../../assets/images/users/user-round.svg";

import ModeToggle from "../../components/ModeToggle";

export default function Header({ collapsed, onToggleCollapsed, onOpenMobile }) {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const { mode, onToggleMode } = useContext(ConfigContext);
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
            borderBottom: (t) => `1px solid ${alpha(t.palette.common.black, 0.08)}`,
            zIndex: (t) => t.zIndex.drawer + 1
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          {!mdUp && (
            <IconButton edge="start" onClick={onOpenMobile} sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
          )}

          {/* ⬇️ Logo + texto */}
        <Box sx={{ display: "flex", alignItems: "center", mr: 1.5 }}>
        <Box
            component="img"
            src={logoMana}
            alt="Pizzería El Mana"
            sx={{ width: 30, height: 30, borderRadius: 1, mr: 1 }}
        />
        <Typography
            variant="h6"
            sx={{
            fontWeight: 700,
            mr: 1,
            whiteSpace: "nowrap",
            display: { xs: "none", sm: "block" }   // 👈 oculto en móvil
            }}
        >
            PIZZERIA EL MANA
        </Typography>
        </Box>


          {/* Botón colapsar sidebar en desktop */}
          {mdUp && (
            <IconButton size="small" onClick={onToggleCollapsed} sx={{ mr: 1 }}>
              {/* usando el mismo botón; el icono puede cambiar si quieres */}
              <MenuIcon />
            </IconButton>
          )}

          <SearchBar />

          {/* Toggle Light/Dark */}
          <ModeToggle />

          {/* Notificaciones, Perfil, Settings */}
          <NotificationsPopover />
          <ProfilePopover />
          <IconButton onClick={()=>setOpenSettings(true)}>
            <SettingsOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <SettingsDrawer open={openSettings} onClose={()=>setOpenSettings(false)} />
    </>
  );
}
