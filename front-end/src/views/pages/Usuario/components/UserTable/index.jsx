import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Chip, Avatar, IconButton, Card, CardContent, Typography, Grid, Tooltip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import BlockIcon from "@mui/icons-material/Block";
import PersonIcon from "@mui/icons-material/Person";

const getStatusChip = (status) => {
  switch (status) {
    case "Delivered": return <Chip label="Delivered" color="success" />;
    case "Cancelled": return <Chip label="Cancelled" color="error" />;
    case "Shipped": return <Chip label="Shipped" color="info" />;
    case "Pending": return <Chip label="Pending" color="warning" />;
    default: return <Chip label="Unknown" />;
  }
};

export default function UserTable({ usuarios, onEdit, onChangePassword, onInactivate, onViewProfile, mobile }) {
  if (mobile) {
    return (
      <Grid container spacing={2}>
        {usuarios.map((u) => (
          <Grid item xs={12} key={u.id}>
            <Card>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar src={u.photo} sx={{ width: 100, height: 100 }} />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h6">{u.name} {u.lastname}</Typography>
                    <Typography variant="body2">{u.email}</Typography>
                    <Typography variant="body2">User: {u.user} | Tel: {u.telefono}</Typography>
                    <Typography variant="body2">Sucursal: {u.sucursal} | Rol: {u.rol}</Typography>
                    {getStatusChip(u.status)}
                  </Grid>
                  <Grid item>
                    <Tooltip title="Editar"><IconButton onClick={() => onEdit(u)}><EditIcon color="primary" /></IconButton></Tooltip>
                    <Tooltip title="Contraseña"><IconButton onClick={() => onChangePassword(u)}><LockIcon color="secondary" /></IconButton></Tooltip>
                    <Tooltip title="Inactivar"><IconButton onClick={() => onInactivate(u)}><BlockIcon color="error" /></IconButton></Tooltip>
                    <Tooltip title="Perfil"><IconButton onClick={() => onViewProfile(u)}><PersonIcon /></IconButton></Tooltip>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  // Desktop: tabla normal
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell><TableCell>Foto</TableCell><TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell><TableCell>Email</TableCell><TableCell>User</TableCell>
            <TableCell>Teléfono</TableCell><TableCell>Sucursal</TableCell>
            <TableCell>Rol</TableCell><TableCell>Status</TableCell><TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.id}</TableCell>
              <TableCell><Avatar src={u.photo} /></TableCell>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.lastname}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.user}</TableCell>
              <TableCell>{u.telefono}</TableCell>
              <TableCell>{u.sucursal}</TableCell>
              <TableCell>{u.rol}</TableCell>
              <TableCell>{getStatusChip(u.status)}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(u)}><EditIcon color="primary" /></IconButton>
                <IconButton onClick={() => onChangePassword(u)}><LockIcon color="secondary" /></IconButton>
                <IconButton onClick={() => onInactivate(u)}><BlockIcon color="error" /></IconButton>
                <IconButton onClick={() => onViewProfile(u)}><PersonIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
