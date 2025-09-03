import { NavLink } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import { ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";

export default function NavItemLink({ item, collapsed = false }) {
  const { title, url = "#", icon: IconComp, target } = item;

  return (
    <Tooltip title={collapsed ? title : ""} placement="right">
      <ListItemButton
        component={NavLink}
        to={url}
        target={target ? "_blank" : undefined}
        rel={target ? "noopener noreferrer" : undefined}
        sx={{
          borderRadius: 2,
          mb: 0.5,
          ...(collapsed && { justifyContent: "center", px: 1.2 }),
          "&.active": (t) => ({
            backgroundColor: alpha(t.palette.primary.main, 0.08),
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": { color: t.palette.primary.main }
          })
        }}
      >
        <ListItemIcon sx={{ minWidth: collapsed ? 0 : 36, mr: collapsed ? 0 : 1 }}>
          {IconComp ? <IconComp size={20} /> : null}
        </ListItemIcon>
        {!collapsed && <ListItemText primary={title} />}
      </ListItemButton>
    </Tooltip>
  );
}
