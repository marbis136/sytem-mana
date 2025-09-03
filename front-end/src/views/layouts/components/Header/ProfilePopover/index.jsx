import { useState } from "react";
import {
  IconButton, Avatar, Popover, Box, Typography, TextField, Switch,
  Divider, List, ListItemButton, ListItemText, Button
} from "@mui/material";

export default function ProfilePopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton onClick={(e)=>setAnchorEl(e.currentTarget)}>
        <Avatar src="https://i.pravatar.cc/40?img=5" />
      </IconButton>

      <Popover
        open={open}
        onClose={()=>setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx:{ width: 380, borderRadius: 2 } } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1">Good Morning, Johne Doe</Typography>
          <Typography variant="caption" color="text.secondary">Project Admin</Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="Search profile options"
            sx={{ mt: 2 }}
          />

          <Box
            sx={{
              mt: 2, p: 2, borderRadius: 2,
              bgcolor: (t)=>t.palette.warning.light
            }}
          >
            <Typography fontWeight={700}>Upgrade your plan</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb:1 }}>
              70% discount for 1 years subscriptions.
            </Typography>
            <Button size="small" variant="contained" color="warning">Go Premium</Button>
          </Box>

          <Box sx={{ mt:2, p: 2, borderRadius: 2, bgcolor: (t)=>t.palette.action.hover }}>
            <Row label="Start DND Mode" defaultChecked />
            <Row label="Allow Notifications" />
          </Box>

          <Divider sx={{ my: 1.5 }} />
          <List dense>
            <ListItemButton><ListItemText primary="Account Settings" /></ListItemButton>
            <ListItemButton><ListItemText primary="Social Profile" /></ListItemButton>
            <ListItemButton><ListItemText primary="Logout" /></ListItemButton>
          </List>
        </Box>
      </Popover>
    </>
  );
}

function Row({ label, defaultChecked }) {
  return (
    <Box sx={{ display:'flex', alignItems:'center', justifyContent:'space-between', mb: 1 }}>
      <Typography>{label}</Typography>
      <Switch defaultChecked={defaultChecked} />
    </Box>
  );
}
