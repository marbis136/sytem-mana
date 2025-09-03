import { useState } from "react";
import {
  IconButton, Badge, Popover, Box, Typography, Divider, MenuItem,
  List, ListItemAvatar, Avatar, ListItemText, Button, Select
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

export default function NotificationsPopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  return (
    <>
      <IconButton onClick={(e)=>setAnchorEl(e.currentTarget)}>
        <Badge color="secondary" badgeContent={1}>
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        onClose={()=>setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx:{ width: 360, borderRadius: 2 } } }}
      >
        <Box sx={{ p: 2, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <Typography variant="subtitle1">All Notification</Typography>
          <Button size="small">Mark as all read</Button>
        </Box>

        <Box sx={{ px:2, pb:2 }}>
          <Select fullWidth size="small" defaultValue="all">
            <MenuItem value="all">All Notification</MenuItem>
            <MenuItem value="unread">Unread</MenuItem>
          </Select>
        </Box>
        <Divider />

        <List sx={{ py: 0 }}>
          <Menu />
        </List>

        <Box sx={{ p: 2, textAlign:'center' }}>
          <Button size="small">View All</Button>
        </Box>
      </Popover>
    </>
  );
}

function Menu() {
  return (
    <>
      <Item
        avatar="https://i.pravatar.cc/40?img=12"
        title="John Doe"
        time="2 min ago"
        text="It is a long established fact that a reader will be distracted"
        chips={['Unread','New']}
      />
      <Item
        color="success"
        icon="🛍️"
        title="Store Verification Done"
        time="2 min ago"
        text="We have successfully received your request."
        chips={['Unread']}
      />
      <Item
        color="info"
        icon="📧"
        title="Check Your Mail."
        time="2 min ago"
        text="All done! Now check your inbox as you’re in for a sweet treat!"
        action={<Button variant="contained" size="small">Mail ✈️</Button>}
      />
    </>
  );
}

function Item({ avatar, icon, color='primary', title, time, text, chips=[], action }) {
  return (
    <Box sx={{ px:2, py:1.5, borderTop: t=>`1px solid ${t.palette.divider}` }}>
      <Box sx={{ display:'flex', alignItems:'start', gap:1.5 }}>
        <ListItemAvatar sx={{ minWidth: 40 }}>
          {avatar
            ? <Avatar src={avatar} />
            : <Avatar sx={{ bgcolor: `${color}.light` }}>{icon}</Avatar>
          }
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box sx={{ display:'flex', justifyContent:'space-between' }}>
              <Typography fontWeight={600}>{title}</Typography>
              <Typography variant="caption" color="text.secondary">{time}</Typography>
            </Box>
          }
          secondary={
            <Typography variant="body2" color="text.secondary">{text}</Typography>
          }
        />
      </Box>

      <Box sx={{ mt:1, display:'flex', alignItems:'center', gap:1, flexWrap:'wrap' }}>
        {chips.map((c)=>(
          <Box key={c} sx={{
            px:1, py:0.25, borderRadius: 1, fontSize: 12,
            bgcolor: 'warning.light', color: 'warning.contrastText'
          }}>{c}</Box>
        ))}
        {action}
      </Box>
    </Box>
  );
}
