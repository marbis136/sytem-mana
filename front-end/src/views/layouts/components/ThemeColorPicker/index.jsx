import { useContext } from "react";
import { Box, Typography, Stack, IconButton, Tooltip, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { ConfigContext } from "contexts/ConfigContext";

const PRESETS = ['#1976d2','#1e88e5','#2e7d32','#d32f2f','#f57c00','#7b1fa2','#00897b','#5e35b1'];

function Swatch({ color, selected, onClick }) {
  return (
    <Tooltip title={color}>
      <IconButton onClick={()=>onClick(color)} sx={{
        width: 36, height: 36, borderRadius: '50%',
        bgcolor: color, border: theme => `2px solid ${selected ? theme.palette.common.white : 'rgba(0,0,0,0.12)'}`,
        boxShadow: selected ? 2 : 0, color: 'white'
      }}>
        {selected && <CheckIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
}

export default function ThemeColorPicker({ which = 'primary' }) {
  const { primaryColor, secondaryColor, onSetPrimary, onSetSecondary } = useContext(ConfigContext);
  const value = which === 'primary' ? primaryColor : secondaryColor;
  const onPick = which === 'primary' ? onSetPrimary : onSetSecondary;

  return (
    <Box>
      <Typography variant="overline" sx={{ opacity: .75 }}>
        {which === 'primary' ? 'Primary color' : 'Secondary color'}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
        {PRESETS.map((c) => (
          <Swatch key={c} color={c} selected={value === c} onClick={onPick} />
        ))}
        <TextField
          size="small"
          type="color"
          value={value}
          onChange={(e)=>onPick(e.target.value)}
          sx={{ width: 56, height: 40, p: 0, minWidth: 56, '& input': { p: 0, border: 0, width: 56, height: 40 } }}
        />
      </Stack>
    </Box>
  );
}
