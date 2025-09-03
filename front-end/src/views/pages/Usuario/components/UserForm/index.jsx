import React, { useState } from "react";
import {
  Paper, TextField, Grid, MenuItem, Button, Avatar, Typography, Modal, Box
} from "@mui/material";
import { gridSpacing } from 'store/constant';

export default function UserForm({ onAddUser, desktop, open, onClose }) {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [estado, setEstado] = useState("Activo");
  const [rol, setRol] = useState("User");
  const [photo, setPhoto] = useState(null);

  const roles = ["Admin", "User", "Moderator"];
  const estados = ["Activo", "Inactivo"];

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (user && name && lastname && email) {
      onAddUser({ user, name, lastname, email, telefono, sucursal, estado, rol, status: "Pending", photo });
      setUser(""); setName(""); setLastname(""); setEmail("");
      setTelefono(""); setSucursal(""); setEstado("Activo"); setRol("User"); setPhoto(null);
      if (onClose) onClose();
    }
  };

  const content = (
    <Paper sx={{ p: 2}}>
      <Box>
        <Typography variant="h6" gutterBottom sx={{mb:3}}>
          Crear Usuario
        </Typography>
        <Grid container spacing={gridSpacing} item lg={12} md={6} sm={6} xs={12} >
          <Grid size={{ lg: 2.5, md: 6, sm: 12, xs: 12 }}>
            {/* Columna 1 → Foto */}
          <Grid item xs={12} md={12} textAlign="center">
            <Avatar src={photo} sx={{ width: 150, height: 150, m:2 }} justifyContent="center"/>
            <Grid container spacing={gridSpacing} sx={{ m: 2}}>
              <Grid item >
                <Button variant="contained" component="label" color="secondary">
                  Subir
                  <input type="file" hidden onChange={handlePhotoUpload}/>
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary"> 
                  Sacar
                </Button>
              </Grid>
            </Grid>
          </Grid>
          </Grid>
          <Grid size={{ lg: 9, md: 12, sm: 6, xs: 12 }}>
            {/* Inputs */}
            <Grid item xs={4} md={9} sm= {6} >
              <Grid container spacing={gridSpacing}>
                <Grid item xs={6} sm={6} md={12}>
                  <TextField label="User" value={user} onChange={(e) => setUser(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={6} sm={6} md={12}>
                  <TextField label="Nombre" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={6} sm={6} md={12}>
                  <TextField label="Apellido" value={lastname} onChange={(e) => setLastname(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={6} sm={6} md={12}>
                  <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={6} sm={6} md={12}>
                  <TextField label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={6} sm={6} md={12}>
                  <TextField label="Sucursal" value={sucursal} onChange={(e) => setSucursal(e.target.value)} fullWidth />
                </Grid>
                <Grid item xs={6} sm={6} md={12}>
                  <TextField select label="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} fullWidth>
                    {estados.map((e) => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                  </TextField>
                </Grid>
                <Grid item xs={6} sm={12} md={12}>
                  <TextField select label="Rol" value={rol} onChange={(e) => setRol(e.target.value)} fullWidth>
                    {roles.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          

          
        </Grid>
      </Box>

      {/* Botón Guardar fijo abajo */}
       <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button variant="contained" color="success" size="medium" onClick={handleSave}>
              Guardar Usuario
            </Button>
          </Grid>
    </Paper>
  );

  

  return content; // Desktop normal
}
