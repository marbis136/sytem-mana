import { useState } from "react";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../../auth/AuthContext.jsx";

import {
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Link
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import ModeToggle from "../../layouts/components/ModeToggle";

export default function Login() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const { login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const from = state?.from?.pathname || "/";

  // 🔑 estados para username y password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e?.preventDefault?.();
    setLoading(true);
    try {
      // 🔑 llamar a AuthContext pasando login y password
      await login({ login: username, password });
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      alert("Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  // Paleta de colores en función del modo global
  const colors = isDark
    ? {
        bg: "#061b26",
        panelBg:
          "linear-gradient(180deg, rgba(13,32,45,0.85) 0%, rgba(12,29,41,0.85) 100%)",
        text: "#e6f7ff",
        sub: "#9ad7e0",
        glow: "0 0 0 1px rgba(0,255,255,0.18), 0 0 28px rgba(0, 217, 255, 0.35), inset 0 0 0 1px rgba(255,255,255,0.04)",
        rightTitle: "#fff",
        accentOpacity: 0.95
      }
    : {
        bg: "#f5faff",
        panelBg:
          "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(250,250,250,0.9) 100%)",
        text: "#1d1d1d",
        sub: "#4c6a77",
        glow: "0 0 0 1px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.15)",
        rightTitle: "#024",
        accentOpacity: 0.6
      };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: colors.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        transition: "all .3s ease"
      }}
    >
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <ModeToggle size="small" />
      </Box>

      <Paper
        elevation={0}
        sx={{
          position: "relative",
          width: { xs: "92vw", sm: 640, md: 820 },
          minHeight: { xs: 420, sm: 420, md: 440 },
          borderRadius: 2.5,
          p: { xs: 3, sm: 4 },
          overflow: "hidden",
          background: colors.panelBg,
          boxShadow: colors.glow
        }}
      >
        <Box
          aria-hidden
          sx={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            "&::after": {
              content: '""',
              position: "absolute",
              right: -120,
              top: -80,
              bottom: -80,
              width: "70%",
              background:
                "linear-gradient(135deg, #00f0ff 0%, #00c9d6 45%, #00bfa6 100%)",
              opacity: colors.accentOpacity,
              filter: "drop-shadow(0 0 18px rgba(0, 240, 255, 0.35))",
              clipPath: "polygon(26% 0, 100% 0, 100% 100%, 0 100%)",
              borderRadius: 16
            }
          }}
        />

        {/* Contenido */}
        <Box
          sx={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 3, md: 2 },
            alignItems: "center",
            zIndex: 1,
            minHeight: { md: 360 }
          }}
        >
          {/* Formulario */}
          <Box component="form" onSubmit={handleLogin} sx={{ px: { md: 2 } }}>
            <Typography
              variant="h4"
              sx={{ color: colors.text, fontWeight: 800, mb: 2 }}
            >
              Login
            </Typography>

            {/* 🔑 Username controlado */}
            <TextField
              fullWidth
              variant="standard"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PersonOutlineOutlinedIcon sx={{ color: colors.sub }} />
                  </InputAdornment>
                )
              }}
              sx={underlineSx(colors)}
            />

            {/* 🔑 Password controlado */}
            <TextField
              fullWidth
              variant="standard"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockOutlinedIcon sx={{ color: colors.sub }} />
                  </InputAdornment>
                )
              }}
              sx={{ ...underlineSx(colors), mt: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                mt: 4,
                py: 1.4,
                fontWeight: 700,
                color: "#02242f",
                borderRadius: 999,
                background:
                  "linear-gradient(180deg, #57f7ff 0%, #1de0f2 60%, #00c2d6 100%)",
                boxShadow:
                  "0 6px 18px rgba(0, 224, 255, 0.35), inset 0 -2px 0 rgba(0,0,0,0.2)",
                "&:hover": {
                  boxShadow:
                    "0 8px 24px rgba(0, 224, 255, 0.45), inset 0 -2px 0 rgba(0,0,0,0.25)",
                  transform: "translateY(-1px)"
                },
                transition: "all .2s ease"
              }}
            >
              {loading ? "Ingresando..." : "Login"}
            </Button>

            <Typography
              variant="body2"
              sx={{ mt: 2, color: colors.sub, textAlign: "center" }}
            >
              Don’t have an account?{" "}
              <Link component={RouterLink} to="/pages/register" underline="hover">
                Sign Up
              </Link>
            </Typography>
          </Box>

          {/* Mensaje derecho */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              pr: 1
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: colors.rightTitle,
                fontWeight: 900,
                letterSpacing: 1,
                mb: 1
              }}
            >
              WELCOME<br />BACK!
            </Typography>
            <Typography sx={{ color: colors.text, opacity: 0.8, maxWidth: 260 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

const underlineSx = (colors) => ({
  input: { color: colors.text },
  label: { color: colors.sub },
  "& .MuiInput-underline:before": {
    borderBottomColor: colors.sub + "66"
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: colors.sub
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#5df3ff"
  }
});
