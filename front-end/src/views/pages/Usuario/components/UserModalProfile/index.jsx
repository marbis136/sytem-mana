import React from "react";
import {
  Modal,
  Box,
  Typography,
  Avatar,
  Grid,
  Divider,
  Button,
} from "@mui/material";

export default function UserModalProfile({ open, onClose, user }) {
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
          borderRadius: 3,
          boxShadow: 24,
          width: 450,
        }}
      >
        {/* Foto */}
        <Grid container direction="column" alignItems="center">
          <Avatar
            src={user.photo}
            sx={{ width: 120, height: 120, mb: 2 }}
          />
          <Typography variant="h6">
            {user.name} {user.lastname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.rol} - {user.estado}
          </Typography>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Info */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Usuario</Typography>
            <Typography>{user.user}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Email</Typography>
            <Typography>{user.email}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Teléfono</Typography>
            <Typography>{user.telefono}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Sucursal</Typography>
            <Typography>{user.sucursal}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Estado</Typography>
            <Typography>{user.estado}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Status</Typography>
            <Typography>{user.status}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Botón cerrar */}
        <Box textAlign="center">
          <Button variant="contained" color="primary" onClick={onClose}>
            Cerrar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
