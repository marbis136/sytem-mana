import { useContext } from "react";
import {
  Drawer, Box, Typography, ToggleButtonGroup, ToggleButton, Slider, IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ConfigContext } from "contexts/ConfigContext";

const FONTS = [
  { label: "Inter", value: "'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif" },
  { label: "Poppins", value: "'Poppins', sans-serif" },
  { label: "Roboto", value: "'Roboto','Helvetica','Arial',sans-serif" }
];

export default function SettingsDrawer({ open, onClose }) {
  const {
    mode, onSetMode, fontFamily, onChangeFontFamily,
    borderRadius, onChangeBorderRadius
  } = useContext(ConfigContext);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}
      slotProps={{ paper: { sx: { width: 360 } } }}>
      <Box sx={{ p: 2, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <Typography variant="subtitle1">Appearance</Typography>
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </Box>

      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="overline">Theme Mode</Typography>
        <ToggleButtonGroup
          value={mode} exclusive
          onChange={(_, v)=> v && onSetMode(v)}
          sx={{ mt: 1 }}
        >
          <ToggleButton value="light" sx={{ flex: 1 }}>Light</ToggleButton>
          <ToggleButton value="dark" sx={{ flex: 1 }}>Dark</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ px: 2, py: 2 }}>
        <Typography variant="overline">Font Style</Typography>
        <Box sx={{ mt: 1, display:'grid', gap:1.2 }}>
          {FONTS.map(f=>(
            <ToggleButton
              key={f.value}
              value={f.value}
              selected={fontFamily === f.value}
              onChange={()=>onChangeFontFamily(f.value)}
              sx={{ justifyContent:'flex-start', borderRadius: 2, fontFamily: f.value, height: 44 }}
            >
              {f.label}
            </ToggleButton>
          ))}
        </Box>
      </Box>

      <Box sx={{ px: 2, py: 2 }}>
        <Typography variant="overline">Border Radius</Typography>
        <Box sx={{ px: 0.5, mt: 2 }}>
          <Slider
            value={borderRadius}
            min={4} max={24} step={1}
            valueLabelDisplay="on"
            onChange={onChangeBorderRadius}
          />
          <Box sx={{ display:'flex', justifyContent:'space-between', color:'text.secondary' }}>
            <Typography variant="caption">4px</Typography>
            <Typography variant="caption">24px</Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
