import PrivateRoute from "../shared/PrivateRoute"; // ver abajo
import AppLayout from "../views/layouts/AppLayout";      // opcional
import Dashboard from "../views/pages/Dashboard";
import Login from "../views/pages/Login"; 
import Caja from "../views/pages/venta/caja";
import Venta from "../views/pages/venta/Dashboard/navbar";


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
    { path: "caja", element: <Caja /> },
    { path: "login", element: <Login /> },
  ],
};

export default GestionVentas;
