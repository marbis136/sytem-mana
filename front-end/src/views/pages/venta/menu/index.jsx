import React, { useState, useEffect, useRef } from "react";
import {
  Box, Grid, Button, Paper, Typography, TextField, Select, MenuItem,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, InputAdornment
} from "@mui/material";
import {
  LocalPizza, LocalBar, Cake, EmojiNature, LunchDining, Restaurant,
  Category as DefaultIcon, Delete as DeleteIcon, Search as SearchIcon
} from "@mui/icons-material";
import ProductoCard from "./BotonProduct";
import ModalCortesia from "./Cortesia";
import ModalVenta from "./VentaDetalle";
import { red } from "@mui/material/colors";

// Simulación de productos
const products = [
  { id: 1, code: 10, name: "Pizza Tradicional", category: "Pizzas", subcategory: "Familiar", size: "F", price: 65 },
  { id: 2, code: "19 ME", name: "Pizza Hawaiana", category: "Pizzas", subcategory: "Familiar", size: "F", price: 85 },
  { id: 3, code: 23, name: "Pizza Mexicana", category: "Pizzas", subcategory: "Mediana", size: "M", price: 72 },
  { id: 4, code: 45, name: "Pizza Fugazzeta", category: "Pizzas", subcategory: "Personal", size: "P", price: 50 },
  { id: 5, code: 50, name: "Torta Chocolate", category: "Postres", subcategory: "Tortas", size: "P", price: 20 },
  { id: 6, code: 26, name: "Jugo Natural", category: "Bebidas", subcategory: "Jugos", size: "M", price: 10 },
  { id: 7, code: 31, name: "Coca-Cola 1L", category: "Bebidas", subcategory: "Gaseosas", size: "M", price: 12 }
];

// Categorías y subcategorías
const categoryIcons = {
  Pizzas: <LocalPizza />, Bebidas: <LocalBar />, Postres: <Cake />,
  Ensaladas: <EmojiNature />, Hamburguesas: <LunchDining />, Combos: <Restaurant />
};

const subcategoriasPorCategoria = {
  Pizzas: ["Familiar", "Mediana", "Personal"],
  Bebidas: ["Gaseosas", "Jugos"],
  Postres: ["Tortas", "Helados"],
  Extras: ["Salsas", "Porciones"],
  Ingredientes: ["Vegetales", "Carnes"],
  Combos: ["Pareja", "Familiar"]
};

// Utilidades
const obtenerNombreProducto = (code) =>
  products.find(p => p.code === code)?.name || `#${code}`;

const obtenerPrecio = (item) => {
  if (item.tipo === "mitad") {
    const p1 = products.find(p => p.code === item.prod1)?.price || 0;
    const p2 = products.find(p => p.code === item.prod2)?.price || 0;
    return Math.max(p1, p2);
  }
  return products.find(p => p.code === item.prod1)?.price || 0;
};

// Componente principal
export default function PuntoDeVenta() {
  const categorias = Object.keys(subcategoriasPorCategoria);
  const [activeCategory, setActiveCategory] = useState("Pizzas");
  const [activeSub, setActiveSub] = useState(subcategoriasPorCategoria["Pizzas"][0]);
  const [items, setItems] = useState([]);
  const [descuento, setDescuento] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalCortesia, setModalCortesia] = useState(false);
  const [modalVenta, setModalVenta] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    setActiveSub(subcategoriasPorCategoria[activeCategory]?.[0] || "");
    setSearchTerm("");
    setTimeout(() => searchInputRef.current?.focus(), 100);
  }, [activeCategory]);

  const handleAddToCart = (product) => {
    const nuevoItem = {
      cantidad: 1,
      tipo: "entera",
      prod1: product.code,
      prod2: null,
      tamaño: product.size,
      precio: product.price
    };
    setItems(prev => [...prev, nuevoItem]);
  };

  const updateItem = (index, key, value) => {
    const nuevos = [...items];
    nuevos[index][key] = value;
    setItems(nuevos);
  };

  const eliminarItem = (index) => setItems(items.filter((_, i) => i !== index));
  const limpiarCarrito = () => { setItems([]); setDescuento(0); };

  const subtotal = items.reduce((acc, i) => acc + obtenerPrecio(i) * i.cantidad, 0);
  const totalPagar = subtotal - (subtotal * (descuento / 100));

  const productosFiltrados = products.filter(
    (p) => p.category === activeCategory &&
      (!activeSub || p.subcategory === activeSub) &&
      (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.code.toString().includes(searchTerm))
  );

  return (
    <>
      {/* PANEL PRINCIPAL */}
      <Box display="flex">
        {/* Categorías */}
        <Box width={240} height="100vh" bgcolor="#f8f5f0" p={2}>
          <Typography variant="h6" fontWeight="bold" mb={2}>Clasificaciones</Typography>
          <Paper elevation={1} sx={{ p: 1.5, bgcolor: "#fefefe", borderRadius: 3 }}>
            {categorias.map((cat, index) => {
              const isActive = cat === activeCategory;
              const icon = categoryIcons[cat] || <DefaultIcon />;
              return (
                <Button
                  key={index}
                  fullWidth
                  startIcon={icon}
                  onClick={() => setActiveCategory(cat)}
                  sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    bgcolor: isActive ? "#ffe0b2" : "#FFF1E6",
                    mb: 1, py: 1, borderRadius: 2,
                    fontWeight: isActive ? "bold" : 500,
                    "&:hover": { bgcolor: "#ffcc80" }
                  }}
                >
                  {cat}
                </Button>
              );
            })}
          </Paper>
        </Box>

        {/* Productos */}
        <Box flex={1} p={2}>
          <Box display="flex" gap={2} mb={2} justifyContent="space-between" flexWrap="wrap">
            <Box display="flex" gap={1} flexWrap="wrap">
              {subcategoriasPorCategoria[activeCategory]?.map((sub, index) => (
                <Button
                  key={index}
                  variant={sub === activeSub ? "contained" : "outlined"}
                  onClick={() => setActiveSub(sub)}
                  sx={{
                    backgroundColor: sub === activeSub ? "#FFCC80" : "#fff",
                    color: sub === activeSub ? "#000" : "#4B5563",
                    borderColor: "#FFCC80", fontWeight: 500,
                    borderRadius: 8, textTransform: "none", px: 2,
                    "&:hover": { backgroundColor: "#FFE0B2" }
                  }}
                >
                  {sub}
                </Button>
              ))}
            </Box>
            <TextField
              inputRef={searchInputRef}
              size="small"
              placeholder="Buscar por nombre o código"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ minWidth: 250 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                )
              }}
            />
          </Box>
          <Grid container spacing={2}>
            {productosFiltrados.map((product) => (
              <Grid item xs={6} md={3} key={product.id}>
                <ProductoCard product={product} onClick={handleAddToCart} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Pedido */}
        <Box width={390} p={0.6} bgcolor="#f2e2d2" height="100vh" display="flex" flexDirection="column" justifyContent="space-between">
          <Paper elevation={3} sx={{ p: 1, backgroundColor: "#d5baba", flex: 1, maxHeight: "60vh", overflow: "auto", mb: 0 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>Pedido</Typography>
            <Table size="small" stickyHeader sx={{ tableLayout: "fixed", width: "100%" }}>
  <TableHead>
    <TableRow>
      <TableCell sx={{ width: 50, fontSize: "0.70rem", py: 0.5 }}>Cant</TableCell>
      <TableCell sx={{ width: 110, fontSize: "0.70rem", py: 0.5 }}>Tipo</TableCell>
      <TableCell sx={{ maxWidth: 120, fontSize: "0.70rem", py: 0.5 }}>Descrip.</TableCell>
      <TableCell sx={{ width: 50, fontSize: "0.70rem", py: 0.5 }}>Precio</TableCell>
      <TableCell sx={{ width: 60, fontSize: "0.70rem", py: 0.5 }}>Eliminar</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {items.length === 0 ? (
      <TableRow>
        <TableCell colSpan={5} align="center" sx={{ fontSize: "0.65rem", py: 0.5 }}>
          Carrito vacío
        </TableCell>
      </TableRow>
    ) : (
      items.map((item, i) => {
        const baseProd = products.find(p => p.code === item.prod1);
        const isPizza = baseProd?.category === "Pizzas";
        const isPersonal = baseProd?.size === "P";
        const descripcion = item.tipo === "entera"
          ? `${item.prod1} ${item.tamaño}`
          : `${item.prod1}/${item.prod2 || "??"} ${item.tamaño}`;
        return (
          <TableRow key={i}>
            <TableCell sx={{ py: 0.5 }}>
              <TextField
                size="small"
                value={item.cantidad}
                onChange={(e) =>
                  updateItem(i, "cantidad", parseInt(e.target.value) || 1)
                }
                sx={{
                  width: 50,
                  fontSize: "0.75rem",
                  "& .MuiInputBase-input": { fontSize: "0.75rem", py: 0.5 }
                }}
              />
            </TableCell>
            <TableCell sx={{ py: 0.5 }}>
              <Box display="flex" flexDirection="column" gap={0.25}>
                <Select
                  size="small"
                  value={item.tipo}
                  onChange={(e) => {
                    const nuevos = [...items];
                    nuevos[i].tipo = e.target.value;
                    if (e.target.value === "mitad" && isPizza && !isPersonal) {
                      const compatibles = products.filter(p =>
                        p.category === "Pizzas" &&
                        p.subcategory === baseProd.subcategory &&
                        p.size === baseProd.size &&
                        p.code !== baseProd.code
                      );
                      nuevos[i].prod2 = compatibles[0]?.code || null;
                    } else {
                      nuevos[i].prod2 = null;
                    }
                    setItems(nuevos);
                  }}
                  disabled={!isPizza || isPersonal}
                  sx={{
                    fontSize: "0.75rem",
                    "& .MuiSelect-select": { py: 0.5, fontSize: "0.75rem" }
                  }}
                  MenuProps={{ PaperProps: { sx: { fontSize: "0.75rem" } } }}
                >
                  <MenuItem value="entera" sx={{ fontSize: "0.75rem" }}>entera</MenuItem>
                  {isPizza && !isPersonal && (
                    <MenuItem value="mitad" sx={{ fontSize: "0.75rem" }}>mitad</MenuItem>
                  )}
                </Select>

                {item.tipo === "mitad" && isPizza && !isPersonal && (
                  <Select
                    size="small"
                    value={item.prod2 || ""}
                    onChange={(e) => updateItem(i, "prod2", e.target.value)}
                    sx={{
                      fontSize: "0.75rem",
                      "& .MuiSelect-select": { py: 0.5, fontSize: "0.75rem" }
                    }}
                    MenuProps={{ PaperProps: { sx: { fontSize: "0.75rem" } } }}
                  >
                    {products
                      .filter(p =>
                        p.category === "Pizzas" &&
                        p.size === baseProd.size &&
                        p.subcategory === baseProd.subcategory &&
                        p.code !== baseProd.code
                      )
                      .map((p) => (
                        <MenuItem key={p.code} value={p.code} sx={{ fontSize: "0.75rem" }}>
                          {p.name}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              </Box>
            </TableCell>
            <TableCell sx={{ py: 0.5 }}>
              <Typography noWrap sx={{ fontSize: "0.70rem" }}>
                {descripcion}
              </Typography>
            </TableCell>
            <TableCell sx={{ fontSize: "0.70rem", py: 0.5 }}>
              ${(obtenerPrecio(item) * item.cantidad).toFixed(0)}
            </TableCell>
            <TableCell sx={{ py: 0.5 }}>
              <IconButton size="small" onClick={() => eliminarItem(i)} sx={{ p: 0.25 }}>
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })
    )}
  </TableBody>
</Table>


          </Paper>

          {/* Resumen y acciones */}
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography>Subtotal: Bs.{subtotal.toFixed(2)}</Typography>
            <Box display="flex" alignItems="center" gap={1} my={1}>
              <TextField
                label="% Descuento"
                size="small"
                value={descuento}
                onChange={(e) => {
                  let val = parseFloat(e.target.value);
                  if (val < 0) val = 0;
                  if (val > 100) val = 100;
                  setDescuento(val);
                }}
                sx={{ width: 100 }}
              />
              <Typography variant="body2">
                (-Bs.{(subtotal * (descuento / 100)).toFixed(2)})
              </Typography>
            </Box>
            <Typography fontWeight="bold">Total: Bs.{totalPagar.toFixed(2)}</Typography>

            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="contained" color="error" onClick={limpiarCarrito}>Cancelar</Button>
              <Button variant="contained" sx={{ backgroundColor: "#ffeb3b", color: "#000" }} onClick={() => setModalCortesia(true)}>Cortesía</Button>
              <Button variant="contained" color="success" onClick={() => setModalVenta(true)}>Vender</Button>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Modales */}
<ModalCortesia open={modalCortesia} onClose={() => setModalCortesia(false)} />
<ModalVenta open={modalVenta} onClose={() => setModalVenta(false)} total={totalPagar} items={items} />
</>
  );
}


{/* Esto es menu para comit*/}
{/* Esto es menu para comit*/}
