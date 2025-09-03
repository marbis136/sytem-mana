import { useState } from "react";
import {
  RouterProvider,
} from "react-router-dom";

// ---------- MUI ----------
import {
  CssBaseline,
} from "@mui/material";

// ---------- Theme (global) ----------
import { ConfigProvider } from "./contexts/ConfigContext.jsx";
import AppThemeProvider from "./theme/AppThemeProvider.jsx";


export default function App() {
  return (
    <ConfigProvider>
      <AppThemeProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </AppThemeProvider>
    </ConfigProvider>
  );
}
