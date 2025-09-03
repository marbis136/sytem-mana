import React from "react";
import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button
} from "@mui/material";

export default function Cortesia({ open, onClose, onConfirm }) {
  const [nombre, setNombre] = React.useState("");
  const [motivo, setMotivo] = React.useState("");

  const handleConfirm = () => {
    onConfirm({ nombre, motivo });
    setNombre("");
    setMotivo("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cortesía</DialogTitle>
      <DialogContent>
        <TextField
          label="Para quién"
          fullWidth
          margin="dense"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          label="Motivo"
          fullWidth
          margin="dense"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
