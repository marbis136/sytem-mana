import { NavLink } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import { ListItemButton, ListItemIcon, ListItemText, Tooltip, Box } from "@mui/material";

const itemSx = (collapsed) => ({
  borderRadius: 2,
  mb: 0.5,
  ...(collapsed && { justifyContent: "center", px: 1.2 })
});
const iconSx = (collapsed) => ({
  minWidth: collapsed ? 0 : 36,
  mr: collapsed ? 0 : 1
});

export default function NavItem({ to, label, icon, end = false, dense = false, collapsed = false }) {
  return (
    <Tooltip title={collapsed ? label : ""} placement="right">
      <ListItemButton
        component={NavLink}
        to={to}
        end={end}
        sx={{
          ...itemSx(collapsed),
          ...(dense && !collapsed ? { pl: 6 } : {}),
          "&.active": (t) => ({
            backgroundColor: alpha(t.palette.primary.main, 0.08),
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": { color: t.palette.primary.main }
          })
        }}
      >
        <ListItemIcon sx={iconSx(collapsed)}>{icon || <Box sx={{ width: 24 }} />}</ListItemIcon>
        {!collapsed && <ListItemText primary={label} />}
      </ListItemButton>
    </Tooltip>
  );
}
