import { Box, Container, CssBaseline, Fab, Toolbar, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Outlet } from "react-router-dom";

import useSidebar from "../hooks/useSidebar";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import { FULL_WIDTH, MINI_WIDTH } from "../constants";

export default function AppLayout() {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const {
    mobileOpen, collapsed, drawerWidth,
    toggleMobile, closeMobile, toggleCollapsed
  } = useSidebar();

  const effectiveCollapsed = mdUp ? collapsed : false;
  const effectiveDrawerWidth = mdUp
    ? (effectiveCollapsed ? MINI_WIDTH : FULL_WIDTH)
    : FULL_WIDTH;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <CssBaseline />

      <Header
        collapsed={collapsed}
        onToggleCollapsed={toggleCollapsed}
        onOpenMobile={toggleMobile}
      />

      <Sidebar
        mdUp={mdUp}
        mobileOpen={mobileOpen}
        onCloseMobile={closeMobile}
        collapsed={effectiveCollapsed}
        drawerWidth={effectiveDrawerWidth}
      />

      <Box
        component="main"
        
        sx={{
          bgcolor: "#f0f0f0",
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          ...(mdUp && { ml: `${drawerWidth}px` })
        }}
      >
        <Toolbar />
        <Container maxWidth="xl" sx={{  px: { xs: 0, sm: 2 } }}>
          <Outlet />
        </Container>
      </Box>

      {mdUp && (
        <Fab color="primary" sx={{ position: "fixed", right: 24, bottom: 24 }}>
          <SettingsOutlinedIcon />
        </Fab>
      )}
    </Box>
  );
}
