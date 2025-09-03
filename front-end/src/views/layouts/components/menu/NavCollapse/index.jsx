import { useState } from "react";
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import NavItemLink from "../NavItemLink";
import CollapsedSubmenu from "../CollapsedSubmenu";

export default function NavCollapse({ item, collapsed = false }) {
  const [open, setOpen] = useState(false);
  const { title, icon: IconComp, children = [] } = item;

  // MODO MINI: botón con icono que abre Popover con hijos
  if (collapsed) {
    return (
      <CollapsedSubmenu
        title={title}
        IconComp={IconComp}
        childrenItems={children.filter((c) => c.type === "item")}
      />
    );
  }

  // MODO NORMAL: acordeón clásico
  return (
    <>
      <ListItemButton onClick={() => setOpen((v) => !v)} sx={{ borderRadius: 2, mb: 0.5 }}>
        <ListItemIcon sx={{ minWidth: 36, mr: 1 }}>
          {IconComp ? <IconComp size={20} /> : null}
        </ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ pl: 2 }}>
          {children.map((child) =>
            child.type === "item" ? (
              <NavItemLink key={child.id} item={child} />
            ) : null
          )}
        </List>
      </Collapse>
    </>
  );
}
