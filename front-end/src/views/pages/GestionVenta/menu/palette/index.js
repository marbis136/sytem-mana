import {
    Box,
    Typography,
    Divider,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    TextField,
    Button,
  } from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete";
  import paletaColores from "./palette.js";
  import { useState } from "react";
  
  export default function CarritoVenta() {
    const [items, setItems] = useState([
      { nombre: "Pizza Familiar", cantidad: 1, precio: 12.5 },
      { nombre: "Refresco 1L", cantidad: 2, precio: 6.0 },
    ]);
    const [descuento, setDescuento] = useState(0);
  
    const total = items.reduce((acc, item) => acc + item.cantidad * item.precio, 0);
    const totalAPagar = total - descuento;
  
    const eliminarItem = (index) => {
      const nuevosItems = [...items];
      nuevosItems.splice(index, 1);
      setItems(nuevosItems);
    };
  
    return (
      <Box
        width={350}
        bgcolor={paletaColores.cart}
        p={2}
        height="100%"
        borderLeft={`1px solid ${paletaColores.borderColor}`}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Carrito
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Cant</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="center">Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.cantidad}</TableCell>
                  <TableCell>{item.nombre}</TableCell>
                  <TableCell align="right">
                    ${(item.precio * item.cantidad).toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={() => eliminarItem(index)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
  
          <Divider sx={{ my: 2 }} />
  
          <Typography variant="body2">Subtotal: ${total.toFixed(2)}</Typography>
          <TextField
            size="small"
            type="number"
            label="Descuento"
            value={descuento}
            onChange={(e) => setDescuento(parseFloat(e.target.value) || 0)}
            fullWidth
            margin="dense"
          />
          <Typography variant="subtitle1" fontWeight="bold">
            Total a Pagar: ${totalAPagar.toFixed(2)}
          </Typography>
        </Box>
  
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="outlined" color="secondary">
            Cortesía
          </Button>
          <Button variant="outlined" color="error">
            Cancelar
          </Button>
          <Button variant="contained" color="primary">
            Vender
          </Button>
        </Box>
      </Box>
    );
  }
  