import { createBrowserRouter } from "react-router-dom";
import AuthenticationRoutes from "./AuthenticationRoutes";
import MainRoutes from "./MainRoutes";
import GestionVentas from "./GestionVentas";


const router = createBrowserRouter(
  [MainRoutes, AuthenticationRoutes, GestionVentas],
  {
    basename: import.meta.env.VITE_APP_BASE_NAME || "/",
  }
);

export default router;
