import React, { useState } from "react";
import { Box, Grid, Typography, AppBar, Toolbar, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import UserForm from "../Usuario/components/UserForm";
import UserTable from "../Usuario/components/UserTable";
import UserModalEdit from "../Usuario/components/UserModalEdit";
import UserModalPassword from "../Usuario/components/UserModalPassword";
import UserModalProfile from "../Usuario/components/UserModalProfile";

const initialUsers = [
  {
    id: 1,
    user: "zchan",
    name: "Zinzu",
    lastname: "Lee",
    email: "zinzu@example.com",
    telefono: "789456123",
    sucursal: "Sucursal Central",
    rol: "Admin",
    status: "Delivered",
    photo: null,
  },
  {
    id: 2,
    user: "jsaru",
    name: "Jeet",
    lastname: "Saru",
    email: "jeet@example.com",
    telefono: "987654321",
    sucursal: "Sucursal Norte",
    rol: "User",
    status: "Cancelled",
    photo: null,
  },
  {
    id: 3,
    user: "sonalgh",
    name: "Sonal",
    lastname: "Gharti",
    email: "sonal@example.com",
    telefono: "456123789",
    sucursal: "Sucursal Sur",
    rol: "Moderator",
    status: "Shipped",
    photo: null,
  },
];

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openCreate, setOpenCreate] = useState(false); // modal crear usuario

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleAddUser = (user) => {
    setUsuarios([...usuarios, { ...user, id: usuarios.length + 1 }]);
    setOpenCreate(false);
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Barra superior */}
      {isMobile && (
        <Button variant="contained" color="secondary" onClick={() => setOpenCreate(true)}>
          Crear Usuario
        </Button>
      )}

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Formulario solo visible en desktop */}
        {!isMobile && (
          <Grid item xs={12} size={{ xs: 12, md: 12}}>
            <UserForm onAddUser={handleAddUser} desktop />
          </Grid>
        )}

        {/* Tabla / Cards usuarios */}
        <Grid item xs={12} size={{ xs: 12, md: 12 }}>
          <UserTable
            usuarios={usuarios}
            onEdit={(u) => { setSelectedUser(u); setOpenEdit(true); }}
            onChangePassword={(u) => { setSelectedUser(u); setOpenPassword(true); }}
            onInactivate={(u) =>
              setUsuarios(usuarios.map((x) => x.id === u.id ? { ...x, estado: "Inactivo", status: "Cancelled" } : x))
            }
            onViewProfile={(u) => { setSelectedUser(u); setOpenProfile(true); }}
            mobile={isMobile}
          />
        </Grid>
      </Grid>

      {/* Modales */}
      <UserModalEdit open={openEdit} onClose={() => setOpenEdit(false)} user={selectedUser} />
      <UserModalPassword open={openPassword} onClose={() => setOpenPassword(false)} user={selectedUser} />
      <UserModalProfile open={openProfile} onClose={() => setOpenProfile(false)} user={selectedUser} />

      {/* Modal de crear usuario solo en mobile */}
      {isMobile && (
        <UserForm onAddUser={handleAddUser} open={openCreate} onClose={() => setOpenCreate(false)} />
      )}
    </Box>
  );
}
