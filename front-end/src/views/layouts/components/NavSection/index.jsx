import { useState } from "react";
import {
  List, ListItemButton, ListItemIcon, ListItemText, Collapse
} from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import LayersIcon from "@mui/icons-material/Layers";

import SectionTitle from "../SectionTitle";
import NavItem from "../NavItem";

const itemSx = (collapsed) => ({
  borderRadius: 2,
  mb: 0.5,
  ...(collapsed && { justifyContent: "center", px: 1.2 })
});
const iconSx = (collapsed) => ({
  minWidth: collapsed ? 0 : 36,
  mr: collapsed ? 0 : 1
});

export default function NavSection({ collapsed }) {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <List sx={{ px: 1, pt: 1 }}>
      <SectionTitle collapsed={collapsed}>Dashboard</SectionTitle>
      <NavItem to="/" label="Dashboard" icon={<DashboardIcon />} end collapsed={collapsed} />

      <SectionTitle collapsed={collapsed}>Pages</SectionTitle>
      <ListItemButton onClick={() => setAuthOpen(v => !v)} sx={itemSx(collapsed)}>
        <ListItemIcon sx={iconSx(collapsed)}><VpnKeyIcon /></ListItemIcon>
        {!collapsed && <ListItemText primary="Authentication" />}
        {!collapsed && (authOpen ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      <Collapse in={authOpen && !collapsed} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <NavItem to="/login" label="Login" dense collapsed={collapsed} />
        </List>
      </Collapse>

      <SectionTitle collapsed={collapsed}>Utilities</SectionTitle>
      <NavItem to="/typography" label="Typography" icon={<TextFieldsIcon />} collapsed={collapsed} />
      <NavItem to="/color" label="Color" icon={<ColorLensIcon />} collapsed={collapsed} />
      <NavItem to="/shadow" label="Shadow" icon={<LayersIcon />} collapsed={collapsed} />
    </List>
  );
}
