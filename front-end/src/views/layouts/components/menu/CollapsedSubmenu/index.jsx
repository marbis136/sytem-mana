import { useState } from "react";
import {
  ListItemButton, ListItemIcon, Popover, List, ListItemButton as Item,
  ListItemText, Paper
} from "@mui/material";

/**
 * Botón de sección (solo icono) que abre un Popover con los hijos.
 * props: { title, IconComp, childrenItems: [{id,title,url,target}] }
 */
export default function CollapsedSubmenu({ title, IconComp, childrenItems = [] }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <ListItemButton
        onClick={handleOpen}
        sx={{ borderRadius: 2, mb: 0.5, justifyContent: "center", px: 1.2 }}
        title={title}
        aria-haspopup="menu"
        aria-expanded={open ? "true" : undefined}
      >
        <ListItemIcon sx={{ minWidth: 0 }}>
          {IconComp ? <IconComp size={20} /> : null}
        </ListItemIcon>
      </ListItemButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "center", horizontal: "right" }}
        transformOrigin={{ vertical: "center", horizontal: "left" }}
        slotProps={{ paper: { elevation: 3 } }}
      >
        <Paper sx={{ minWidth: 180, py: 0.5 }}>
          <List sx={{ py: 0 }}>
            {childrenItems.map((child) => (
              <Item
                key={child.id}
                component="a"
                href={child.url || "#"}
                target={child.target ? "_blank" : undefined}
                rel={child.target ? "noopener noreferrer" : undefined}
                dense
                onClick={handleClose}
              >
                <ListItemText primary={child.title} />
              </Item>
            ))}
          </List>
        </Paper>
      </Popover>
    </>
  );
}
