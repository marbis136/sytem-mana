import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx";

import { ConfigProvider } from "./contexts/ConfigContext"; // tu archivo
import AppThemeProvider from "./theme/AppThemeProvider.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx"; // si ya lo usas
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider>
      <AppThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </AppThemeProvider>
    </ConfigProvider>
  </React.StrictMode>
);
