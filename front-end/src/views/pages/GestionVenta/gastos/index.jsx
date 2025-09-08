// Gastos.jsx
import React, { useMemo, useState, memo } from "react";
import {
  Box, Grid, Card, CardContent, Typography,
  TextField, Select, MenuItem, Button,
  ToggleButton, ToggleButtonGroup,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Stack
} from "@mui/material";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import PieChartIcon from "@mui/icons-material/PieChart";
import GroupOffIcon from "@mui/icons-material/GroupOff";

/* =========================================================
   CONSTANTES / CATÁLOGOS
   ========================================================= */
const proveedoresFrecuentes = ["Coca Cola", "Jugo del Valle", "CBN", "Salviety", "Agua Hacienda"];
const empleadosCatalogo = ["Juan", "María", "Pedro", "Lucía"];

/* =========================================================
   TARJETA CATEGORÍAS (MEMOIZADA PARA EVITAR PERDER FOCO)
   ========================================================= */
const TarjetaCategorias = memo(function TarjetaCategorias({
  modoCategoriaUI,
  setModoCategoriaUI,
  formProducto,
  setFormProducto,
  formAdelanto,
  setFormAdelanto,
  empleadosCatalogo,
  onAgregarProducto,
  onAgregarAdelanto,
}) {
  return (
    <Card sx={{ backgroundColor: "#e8eaf6", borderRadius: 3, boxShadow: 4 }}>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
          <PieChartIcon fontSize="large" />
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>Gastos por Categoría</Typography>
        </Stack>

        {/* Botones de modo */}
        <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
          <ToggleButtonGroup
            exclusive
            value={modoCategoriaUI}
            onChange={(_, v) => v && setModoCategoriaUI(v)}
            size="small"
            color="primary"
          >
            <ToggleButton value="producto">Pago por producto</ToggleButton>
            <ToggleButton value="adelanto">Adelantos</ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        {/* Formularios según modo */}
        {modoCategoriaUI === "producto" ? (
          <Stack direction={{ xs: "column", md: "row" }} spacing={1} sx={{ mb: 2 }}>
            <TextField
              label="Descripción"
              value={formProducto.descripcion}
              onChange={(e) => setFormProducto((s) => ({ ...s, descripcion: e.target.value }))}
              size="small"
              fullWidth
              autoComplete="off"
            />
            <TextField
              label="Monto"
              type="text"           // evita problemas de locale con type=number
              inputMode="decimal"   // teclado numérico en móviles
              value={formProducto.monto}
              onChange={(e) => setFormProducto((s) => ({ ...s, monto: e.target.value }))}
              size="small"
              sx={{ width: { xs: "100%", md: 160 } }}
              autoComplete="off"
            />
            <Button variant="contained" onClick={onAgregarProducto}>Agregar</Button>
          </Stack>
        ) : (
          <Stack direction={{ xs: "column", md: "row" }} spacing={1} sx={{ mb: 2 }}>
            <Select
              displayEmpty
              size="small"
              value={formAdelanto.empleado}
              onChange={(e) => setFormAdelanto((s) => ({ ...s, empleado: e.target.value }))}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value=""><em>Selecciona empleado</em></MenuItem>
              {empleadosCatalogo.map((emp) => (
                <MenuItem key={emp} value={emp}>{emp}</MenuItem>
              ))}
            </Select>
            <TextField
              label="Monto"
              type="text"
              inputMode="decimal"
              value={formAdelanto.monto}
              onChange={(e) => setFormAdelanto((s) => ({ ...s, monto: e.target.value }))}
              size="small"
              sx={{ width: { xs: "100%", md: 160 } }}
              autoComplete="off"
            />
            <Button variant="contained" onClick={onAgregarAdelanto}>Agregar</Button>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
});

/* =========================================================
   COMPONENTE PRINCIPAL
   ========================================================= */
export default function Gastos() {
  // ====== STATE PRINCIPAL ======
  const [transacciones, setTransacciones] = useState([
    // Deja vacío si prefieres empezar sin datos
    // { id: 1, fecha: "2025-08-01", categoria: "Bebidas", producto: "Coca Cola 500ml", proveedor: "Coca Cola", monto: 320, tipo: "gasto" },
    // { id: 2, fecha: "2025-08-02", categoria: "Adelantos Empleados", producto: "Adelanto - Juan", proveedor: "Empleado", monto: 200, tipo: "adelanto", empleado: "Juan" },
  ]);
  const [filtroProveedores, setFiltroProveedores] = useState([]); // tarjeta 4
  const [modoDetalle, setModoDetalle] = useState("todas");        // "todas" | "solo-gastos" | "solo-adelantos"
  const [modoCategoriaUI, setModoCategoriaUI] = useState("producto"); // "producto" | "adelanto"

  // Formularios tarjeta 3 (strings; convertimos a número SOLO al guardar)
  const [formProducto, setFormProducto] = useState({ descripcion: "", monto: "" });
  const [formAdelanto, setFormAdelanto] = useState({ empleado: "", monto: "" });

  // ====== SELECTORES / MEMOS ======
  const totalGastos = useMemo(
    () => transacciones.filter((t) => t.tipo === "gasto").reduce((acc, t) => acc + (t.monto || 0), 0),
    [transacciones]
  );

  const filasDetalle = useMemo(() => {
    let rows = transacciones;
    if (filtroProveedores.length) rows = rows.filter((r) => filtroProveedores.includes(r.proveedor));
    if (modoDetalle === "solo-gastos") rows = rows.filter((r) => r.tipo === "gasto");
    if (modoDetalle === "solo-adelantos") rows = rows.filter((r) => r.tipo !== "gasto");
    return rows;
  }, [transacciones, filtroProveedores, modoDetalle]);

  // (Opcional) Resumen por categoría si lo necesitas después
  const resumenCategorias = useMemo(() => {
    const map = {};
    for (const t of transacciones) {
      const k = t.categoria || "Sin categoría";
      if (!map[k]) map[k] = { productos: new Set(), bruto: 0, adelantos: 0, reintegros: 0 };
      map[k].productos.add(t.producto);
      if (t.tipo === "gasto") map[k].bruto += t.monto || 0;
      if (t.tipo === "adelanto") map[k].adelantos += t.monto || 0;
      if (t.tipo === "reintegro") map[k].reintegros += t.monto || 0;
    }
    return map;
  }, [transacciones]);

  // ====== HANDLERS (conversión a número SOLO al guardar) ======
  const agregarPagoProducto = () => {
    const { descripcion, monto } = formProducto;
    if (!descripcion || !monto) return;

    const row = {
      id: Date.now(),
      fecha: new Date().toISOString().slice(0, 10),
      categoria: "Pago por producto", // categoría por defecto
      producto: descripcion,
      proveedor: "N/D",
      monto: Number(monto),
      tipo: "gasto",
    };

    setTransacciones((prev) => [row, ...prev]);
    setFormProducto({ descripcion: "", monto: "" });
  };

  const agregarAdelanto = () => {
    const { empleado, monto } = formAdelanto;
    if (!empleado || !monto) return;

    const row = {
      id: Date.now(),
      fecha: new Date().toISOString().slice(0, 10),
      categoria: "Adelantos Empleados",
      producto: `Adelanto - ${empleado}`,
      proveedor: "Empleado",
      monto: Number(monto),
      tipo: "adelanto",
      empleado,
    };

    setTransacciones((prev) => [row, ...prev]);
    setFormAdelanto({ empleado: "", monto: "" });
  };

  // Gasto rápido por producto
const [quickProducto, setQuickProducto] = useState("");
const [quickMonto, setQuickMonto] = useState("");

const agregarGastoRapido = () => {
  if (!quickProducto || !quickMonto) return;
  const row = {
    id: Date.now(),
    fecha: new Date().toISOString().slice(0, 10),
    categoria: "Pago por producto",
    producto: quickProducto,       // en detalle verás "Coca Cola", "Jugo del Valle", etc.
    proveedor: quickProducto,      // proveedor = producto seleccionado
    monto: Number(quickMonto),
    tipo: "gasto",
  };
  setTransacciones((prev) => [row, ...prev]);
  setQuickProducto("");
  setQuickMonto("");
};


  // ====== SUBCOMPONENTES (tarjetas) ======
  const TarjetaTotal = () => (
    <Card
      sx={{
        backgroundColor: "#ffcdd2",
        borderRadius: 3,
        boxShadow: 3,
        width: 220,
        height: 150,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <MoneyOffIcon fontSize="large" />
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          TOTAL GASTOS
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {totalGastos.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );

  const TarjetaDetalle = () => (
    <Card sx={{ backgroundColor: "#fce4ec", borderRadius: 3, boxShadow: 4 }}>
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
          <TrendingDownIcon fontSize="large" />
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>Detalle de los gastos</Typography>
        </Stack>

        {/* Controles de filtro */}
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
          <ToggleButtonGroup
            exclusive
            size="small"
            color="primary"
            value={modoDetalle}
            onChange={(_, v) => v && setModoDetalle(v)}
          >
            <ToggleButton value="todas">Todas</ToggleButton>
            <ToggleButton value="solo-gastos">Solo gastos</ToggleButton>
            <ToggleButton value="solo-adelantos">Adelantos/Reintegros</ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <TableContainer component={Paper} elevation={0} sx={{ maxHeight: 320 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>Categoría</TableCell>
                <TableCell>Producto / Detalle</TableCell>
                <TableCell align="right">Monto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filasDetalle.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.categoria}</TableCell>
                  <TableCell>{r.producto}</TableCell>
                  <TableCell align="right">{(r.monto || 0).toFixed(2)}</TableCell>
                </TableRow>
              ))}
              {!filasDetalle.length && (
                <TableRow>
                  <TableCell colSpan={6} align="center">Sin registros</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  const TarjetaProveedores = () => (
  <Card sx={{ backgroundColor: "#ede7f6", borderRadius: 3, boxShadow: 4 }}>
    <CardContent>
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
        <GroupOffIcon fontSize="large" />
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Proveedores Frecuentes
        </Typography>
      </Stack>

      {/* Gasto rápido: seleccionar producto + monto */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={1} sx={{ mb: 2 }} justifyContent="center">
        <Select
          displayEmpty
          size="small"
          value={quickProducto}
          onChange={(e) => setQuickProducto(e.target.value)}
          sx={{ minWidth: 240 }}
        >
          <MenuItem value=""><em>Selecciona producto/proveedor</em></MenuItem>
          {proveedoresFrecuentes.map((p) => (
            <MenuItem key={p} value={p}>{p}</MenuItem>
          ))}
        </Select>

        <TextField
          label="Monto"
          type="text"
          inputMode="decimal"
          value={quickMonto}
          onChange={(e) => setQuickMonto(e.target.value)}
          size="small"
          sx={{ width: { xs: "100%", md: 160 } }}
          autoComplete="off"
        />

        <Button variant="contained" onClick={agregarGastoRapido}>
          Agregar
        </Button>
      </Stack>

      {/* (Opcional) Filtro por proveedor con chips */}
      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" justifyContent="center">
        {proveedoresFrecuentes.map((p) => (
          <Chip
            key={p}
            label={p}
            clickable
            onClick={() =>
              setFiltroProveedores((prev) =>
                prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
              )
            }
            color={filtroProveedores.includes(p) ? "primary" : "default"}
            sx={{ borderRadius: 2 }}
          />
        ))}
      </Stack>
    </CardContent>
  </Card>
);


  /* =========================================================
     LAYOUT
     ========================================================= */
  return (
    <Box p={2}>
      {/* Tarjeta 1 */}
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item><TarjetaTotal /></Grid>
      </Grid>

      {/* Tarjetas 2 y 3 */}
      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}><TarjetaDetalle /></Grid>
        <Grid item xs={12} md={6}>
          <TarjetaCategorias
            modoCategoriaUI={modoCategoriaUI}
            setModoCategoriaUI={setModoCategoriaUI}
            formProducto={formProducto}
            setFormProducto={setFormProducto}
            formAdelanto={formAdelanto}
            setFormAdelanto={setFormAdelanto}
            empleadosCatalogo={empleadosCatalogo}
            onAgregarProducto={agregarPagoProducto}
            onAgregarAdelanto={agregarAdelanto}
          />
        </Grid>
      </Grid>

      {/* Tarjeta 4 */}
      <Grid container spacing={3}>
        <Grid item xs={12}><TarjetaProveedores /></Grid>
      </Grid>
    </Box>
  );
}
