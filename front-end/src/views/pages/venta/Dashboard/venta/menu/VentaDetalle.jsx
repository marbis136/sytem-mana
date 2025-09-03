import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import {
  Dialog, Box, DialogTitle, DialogContent, DialogActions,
  Paper, TextField, Typography, Button, Card, CardContent,
  Grid, RadioGroup, FormControlLabel, Radio, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow
} from "@mui/material";



// Tarjeta reutilizable
// Tarjeta reutilizable (tamaño fijo, solo contenido con scroll)
const CustomCard = ({ children, ...props }) => (
  <Card
    variant="outlined"
    sx={{
      width: "560px",        // <-- mantiene tu ancho fijo
      height: "260px",       // <-- mantiene tu alto fijo
      overflow: "hidden",    // evita que el card “crezca”
      boxSizing: "border-box",
      ...props.sx,
    }}
  >
    <CardContent
      sx={{
        height: "100%",
        p: 1.5,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Zona scrolleable */}
      <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
        {children}
      </Box>
    </CardContent>
  </Card>
);



// Modal principal
export default function ModalVenta({ open, onClose, total = 0, onConfirm, items = [] }) {
  const [tipoIdentidad, setTipoIdentidad] = useState("ci");
  const [tipoVenta, setTipoVenta] = useState("mesa");

  const [datosVenta, setDatosVenta] = useState({
    numeroMesa: "",
    descripcion: "",
    nombreCliente: "",
    telefono: "",
    direccion: ""
  });

  const [formData, setFormData] = useState({
    nit: "",
    nombre: "",
    correo: "",
    telefono: ""
  });

  const handleDatosVentaChange = (campo) => (e) => {
    setDatosVenta((prev) => ({
      ...prev,
      [campo]: e.target.value
    }));
  };

  const handleFormDataChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      telefono: value
    }));
  };

  const [metodoPago, setMetodoPago] = useState({ metodo: "efectivo", entregado: "" });

const isFormValid = () => true;

{/* metodos de pago */}
// Estado sugerido arriba del componente:
const METODOS = [
  { key: "efectivo", label: "EFECTIVO" },
  { key: "qr", label: "QR" },
  { key: "tarjeta", label: "TARJETA" },
  { key: "transferencia", label: "TRANSFERENCIA" },
];

const [splits, setSplits] = React.useState([]); 
// cada item: { metodo: 'efectivo'|'qr'|'tarjeta'|'transferencia', monto: number, entregado?: number }

// helpers
const getSplit = (m) => splits.find(s => s.metodo === m);
const totalAsignado = splits.reduce((acc, s) => acc + (Number(s.monto) || 0), 0);
const faltante = Math.max(0, total - totalAsignado);
const sobrante = Math.max(0, totalAsignado - total);

// Para efectivo (si existe)
const cash = getSplit("efectivo");
const cambio = cash ? Math.max(0, (Number(cash.entregado)||0) - (Number(cash.monto)||0)) : 0;

const toggleMetodo = (metodo) => {
  setSplits((prev) => {
    const ya = prev.find(s => s.metodo === metodo);
    if (ya) {
      // quitar método
      return prev.filter(s => s.metodo !== metodo);
    }

    // calcular lo que falta por asignar
    const asignado = prev.reduce((acc, s) => acc + (Number(s.monto) || 0), 0);
    const faltante = Math.max(0, total - asignado);

    // crear inicial con el faltante
    const inicial = metodo === "efectivo"
      ? { metodo, monto: faltante, entregado: 0 }
      : { metodo, monto: faltante };

    return [...prev, inicial];
  });
};


const setMonto = (metodo, monto) => {
  setSplits((prev) =>
    prev.map(s => s.metodo === metodo ? { ...s, monto: Math.max(0, Number(monto) || 0) } : s)
  );
};

const setEntregado = (metodo, entregado) => {
  setSplits((prev) =>
    prev.map(s => s.metodo === metodo ? { ...s, entregado: Math.max(0, Number(entregado) || 0) } : s)
  );
};
// helpers ya existentes...
const montosValidos = splits.every(s => Number(s.monto) > 0);

// efectivo válido solo si existe
const efectivoValido =
  !cash || (Number(cash.entregado) > 0 && Number(cash.entregado) >= Number(cash.monto));

// pago exactamente cubierto (sin faltante ni sobrante)
const pagoCompleto = totalAsignado === total;

// todo válido
const formPagoValido = montosValidos && efectivoValido && pagoCompleto;



  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" aria-labelledby="venta-dialog-title">
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* 1. Datos del cliente */}
          <Grid item xs={12} sm={6}>
  <CustomCard sx={{ p: 1.5 }}>
    <Typography fontWeight="bold" fontSize={13} gutterBottom>
      Tipo de Identidad
    </Typography>
    <RadioGroup
      row
      value={tipoIdentidad}
      onChange={(e) => setTipoIdentidad(e.target.value)}
      sx={{ mb: 1 }}
    >
      <FormControlLabel
        value="ci"
        control={<Radio size="small" />}
        label={<Typography fontSize={12}>CI</Typography>}
      />
      <FormControlLabel
        value="nit"
        control={<Radio size="small" />}
        label={<Typography fontSize={12}>NIT</Typography>}
      />
      <FormControlLabel
        value="pasaporte"
        control={<Radio size="small" />}
        label={<Typography fontSize={12}>PASAPORTE</Typography>}
      />
    </RadioGroup>

    {/* PRIMERA FILA: NUMERO y NOMBRE */}
    <Grid container spacing={1} sx={{ mb: 1 }}>
      <Grid item xs={12} sm={6}>
        <Typography fontWeight="bold" fontSize={13} gutterBottom>
          NUMERO
        </Typography>
        <TextField
          fullWidth
          value={formData.nit}
          onChange={handleFormDataChange("nit")}
          size="small"
          inputProps={{ maxLength: 12 }}
          error={formData.nit.trim() === ""}
          helperText={formData.nit.trim() === "" ? "Este campo es obligatorio" : ""}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography fontWeight="bold" fontSize={13} gutterBottom>
          NOMBRE / RAZÓN SOCIAL
        </Typography>
        <TextField
          fullWidth
          value={formData.nombre}
          onChange={handleFormDataChange("nombre")}
          size="small"
          error={formData.nombre.trim() === ""}
          helperText={formData.nombre.trim() === "" ? "Este campo es obligatorio" : ""}
        />
      </Grid>
    </Grid>

    {/* SEGUNDA FILA: CORREO y TELÉFONO */}
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <Typography fontWeight="bold" fontSize={13} gutterBottom>
          CORREO
        </Typography>
        <TextField
          fullWidth
          value={formData.correo}
          onChange={handleFormDataChange("correo")}
          size="small"
          placeholder="ejemplo@correo.com"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography fontWeight="bold" fontSize={13} gutterBottom>
          TELÉFONO
        </Typography>
        <PhoneInput
          country={"bo"}
          value={formData.telefono}
          onChange={handlePhoneChange}
          inputStyle={{
            width: "100%",
            height: "40px",
            fontSize: "14px",
          }}
          containerStyle={{ width: "100%" }}
          disableCountryCode={null}
          enableSearch
        />
      </Grid>
    </Grid>
  </CustomCard>
</Grid>

          
          {/* 2. Modalidad de venta */}
          <Grid item xs={12} sm={6}>
            <CustomCard>
              <Box display="flex" gap={2}>
                <Box width="35%">
                  <Typography fontWeight="bold" fontSize={14} gutterBottom>Modalidad</Typography>
                  <RadioGroup value={tipoVenta} onChange={(e) => setTipoVenta(e.target.value)}>
                    <FormControlLabel value="mesa" control={<Radio />} label="MESA" />
                    <FormControlLabel value="llevar" control={<Radio />} label="PARA LLEVAR" />
                    <FormControlLabel value="delivery" control={<Radio />} label="DELIVERY" />
                  </RadioGroup>
                </Box>

                <Box width="65%">
                  {tipoVenta === "mesa" && (
                    <>
                      <TextField
                        fullWidth
                        size="small"
                        label="Número de Mesa"
                        value={datosVenta.numeroMesa}
                        onChange={handleDatosVentaChange("numeroMesa")}
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        fullWidth
                        size="small"
                        label="Descripción"
                        value={datosVenta.descripcion}
                        onChange={handleDatosVentaChange("descripcion")}
                      />
                    </>
                  )}
                  {tipoVenta === "llevar" && (
                    <>
                      <TextField
                        fullWidth
                        size="small"
                        label="Nombre"
                        value={datosVenta.nombreCliente}
                        onChange={handleDatosVentaChange("nombreCliente")}
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        fullWidth
                        size="small"
                        label="Descripción"
                        value={datosVenta.descripcion}
                        onChange={handleDatosVentaChange("descripcion")}
                      />
                    </>
                  )}
                  {tipoVenta === "delivery" && (
                    <>
                      <TextField
                        fullWidth
                        size="small"
                        label="Teléfono"
                        value={datosVenta.telefono}
                        onChange={handleDatosVentaChange("telefono")}
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        fullWidth
                        size="small"
                        label="Dirección"
                        value={datosVenta.direccion}
                        onChange={handleDatosVentaChange("direccion")}
                        sx={{ mb: 1 }}
                      />
                      <TextField
                        fullWidth
                        size="small"
                        label="Descripción"
                        value={datosVenta.descripcion}
                        onChange={handleDatosVentaChange("descripcion")}
                      />
                    </>
                  )}
                </Box>
              </Box>
            </CustomCard>
          </Grid>

          {/* 3. Detalle del pedido */}
          
<Grid item xs={12} sm={6}>
  <CustomCard>
    <Typography fontWeight="bold" gutterBottom>Pedido</Typography>

    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Cant</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Precio</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No hay productos
              </TableCell>
            </TableRow>
          ) : (
            items.map((item, idx) => {
              const descripcion = item.tipo === "entera"
                ? `${item.prod1} ${item.tamaño}`
                : `${item.prod1}/${item.prod2 || "??"} ${item.tamaño}`;
              const precioTotal = item.precio * item.cantidad;

              return (
                <TableRow key={idx}>
                  <TableCell>{item.cantidad}</TableCell>
                  <TableCell>{item.tipo}</TableCell>
                  <TableCell>{descripcion}</TableCell>
                  <TableCell>${precioTotal.toFixed(2)}</TableCell>
                </TableRow>
              );
            })
          )}

          {/* Total */}
          {items.length > 0 && (
            <TableRow>
              <TableCell colSpan={3} align="right">
                <Typography fontWeight="bold">Total</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">
                  ${items.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </CustomCard>
</Grid>



          {/* 4. Pago */}
<Grid item xs={12} sm={6}>
  <CustomCard sx={{ p: 2 }}>
    {/* Encabezado */}
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography fontWeight="bold" fontSize={16}>PAGO</Typography>
      <Typography variant="h6" fontWeight="bold" fontSize={16}>
        TOTAL A PAGAR: {total.toFixed(2)} Bs
      </Typography>
    </Box>

    <Box display="flex" gap={2}>
      {/* Botones de métodos */}
      <Box flex={1}>
        {METODOS.map(({ key, label }) => {
          const activo = !!getSplit(key);
          return (
            <Button
              key={key}
              fullWidth
              variant={activo ? "contained" : "outlined"}
              onClick={() => toggleMetodo(key)}
              sx={{ textTransform: "none", fontSize: "12px", py: 1.1, mb: 0.4, borderRadius: 2, fontWeight: "bold" }}
            >
              {label}
            </Button>
          );
        })}
      </Box>

      {/* Contenido dinámico */}
      <Box flex={2} display="flex" flexDirection="column" gap={1.2}>
        {splits.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            Selecciona uno o más métodos a la izquierda.
          </Typography>
        )}

        {splits.map((s) => (
          <Box key={s.metodo} sx={{ p: 1.2, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
              <Typography fontWeight="bold">{METODOS.find(m => m.key === s.metodo)?.label}</Typography>
              <Button size="small" onClick={() => toggleMetodo(s.metodo)}>Quitar</Button>
            </Box>

            {/* Monto del método */}
            <TextField
             fullWidth
              label="Monto"
              type="number"
             size="small"
              value={s.monto}
             onChange={(e) => setMonto(s.metodo, e.target.value)}
              inputProps={{ min: 0, step: "0.01" }}
              sx={{ mb: s.metodo === "efectivo" ? 1 : 0 }}
              error={Number(s.monto) <= 0}
              helperText={Number(s.monto) <= 0 ? "El monto debe ser mayor a 0" : ""}
            />


            {/* Solo efectivo: entregado y cambio */}
            {s.metodo === "efectivo" && (
  <>
    <TextField
      fullWidth
      label="Entregado"
      type="number"
      size="small"
      value={s.entregado ?? 0}
      onChange={(e) => setEntregado("efectivo", e.target.value)}
      inputProps={{ min: 0, step: "0.01" }}
      sx={{ mt: 1 }}
      error={
        Number(s.entregado) <= 0 || Number(s.entregado) < Number(s.monto)
      }
      helperText={
        Number(s.entregado) <= 0
          ? "Debe ingresar el efectivo entregado"
          : (Number(s.entregado) < Number(s.monto)
              ? "El entregado no puede ser menor al monto"
              : "")
      }
    />
    <Typography fontSize={14} fontWeight="bold" sx={{ mt: 0.5 }}>
      Cambio: {cambio.toFixed(2)} Bs
    </Typography>
  </>
)}


            {/* Extras por método (opcional) */}
            {s.metodo === "tarjeta" && (
              <TextField
                fullWidth
                label="Número de Tarjeta"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                size="small"
                sx={{ mt: 1 }}
              />
            )}
            {s.metodo === "transferencia" && (
              <TextField fullWidth label="Referencia" size="small" sx={{ mt: 1 }} />
            )}
            {s.metodo === "qr" && (
              <Button
                fullWidth
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
                onClick={() => alert("Generar Código QR")}
              >
                Generar Código QR
              </Button>
            )}
          </Box>
        ))}

        {/* Resumen / validaciones */}
        <Box mt={1}>
  <Typography fontSize={14}>
    Asignado: <b>{totalAsignado.toFixed(2)} Bs</b> / Total: <b>{total.toFixed(2)} Bs</b>
  </Typography>
  {totalAsignado < total && (
    <Typography fontSize={14} color="warning.main">
      Falta asignar: {(total - totalAsignado).toFixed(2)} Bs
    </Typography>
  )}
  {totalAsignado > total && (
    <Typography fontSize={14} color="error.main">
      Te pasaste por {(totalAsignado - total).toFixed(2)} Bs
    </Typography>
  )}
</Box>

        {/* Botón de confirmar cobro (ejemplo) */}
        <Button
  variant="contained"
  disabled={!formPagoValido}
  onClick={() => {
    // listo para enviar: pagos válidos y total cubierto
    console.log({ pagos: splits, total, cambio });
  }}
  sx={{ mt: 0.5 }}
>
  Confirmar cobro
</Button>

      </Box>
    </Box>
  </CustomCard>
</Grid>


        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="error" variant="contained">
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          color="success"
          variant="contained"
          disabled={!isFormValid()}
        >
          Confirmar Venta
        </Button>
      </DialogActions>
    </Dialog>
  );
}
