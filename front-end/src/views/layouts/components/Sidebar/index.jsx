import { Box, Drawer, Toolbar, Divider } from "@mui/material";
import menuItems from "../../../../menu-items"; // <- TU índice: { items:[dashboard,pages,utilities,other] }
import NavGroup from "../menu/NavGroup";

export default function Sidebar({
  mdUp, mobileOpen, onCloseMobile, collapsed, drawerWidth
}) {
  const paperSX = {
    width: drawerWidth,
    boxSizing: "border-box",
    overflowX: "hidden"
  };

  const content = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar />
      <Divider />
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {menuItems.items.map((group) => (
          <NavGroup key={group.id} item={group} collapsed={collapsed} />
        ))}
      </Box>
    </Box>
  );

  if (!mdUp) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onCloseMobile}
        ModalProps={{ keepMounted: true }}
        sx={{ "& .MuiDrawer-paper": paperSX }}
      >
        {content}
      </Drawer>
    );
  }
  return (
    <Drawer variant="permanent" open sx={{ "& .MuiDrawer-paper": paperSX }}>
      {content}
    </Drawer>
  );
}
