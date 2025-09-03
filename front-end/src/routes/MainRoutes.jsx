import PrivateRoute from "../shared/PrivateRoute"; // ver abajo
import AppLayout from "../views/layouts/AppLayout";      // opcional
import Dashboard from "../views/pages/Dashboard";
import ErrorPage  from "../views/ERROR/ErrorPage";
import Usuario from "../views/pages/Usuario";

const MainRoutes = {
  path: "/",
  element: (
    <PrivateRoute>
      <AppLayout />
    </PrivateRoute>
  ),
  children: [
    { index: true, element: <Dashboard /> },
    { path: "dashboard", element: <Dashboard /> },
    { path: "usuario", element: <Usuario /> },
    { path: "*", element: <ErrorPage /> }
  ]
};
export default MainRoutes;

