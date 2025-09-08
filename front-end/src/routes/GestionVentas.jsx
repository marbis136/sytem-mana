import PrivateRoute from "../shared/PrivateRoute"; // ver abajo
import AppLayout from "../views/layouts/AppLayout";      // opcional
import Dashboard from "../views/pages/Dashboard";
import Caja from "../views/pages/GestionVenta/caja";
import Venta from "../views/pages/GestionVenta/ventas";
import Menu from "../views/pages/GestionVenta/menu";
import Pedido from "../views/pages/GestionVenta/pedidos";
import Gasto from "../views/pages/GestionVenta/gastos";



const GestionVentas = {
  path: "/",
    element: (
      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>
    ),
  children: [
    { index: true, element: <Dashboard /> },
    { path: "ventas", element: <Venta /> },
    { path: "menu", element: <Menu /> },
    { path: "cajas", element: <Caja /> },
    { path: "pedidos", element: <Pedido /> },
    { path: "gastos", element: <Gasto /> },
  ],
};

export default GestionVentas;
