import React from "react";
import { Modal, Box, Typography, TextField, Button, Grid } from "@mui/material";

export default function UserModalEdit({ open, onClose, user }) {
  if (!user) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          width: 400,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Editar Usuario
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="User" defaultValue={user.user} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" defaultValue={user.email} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth>
              Guardar Cambios
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
