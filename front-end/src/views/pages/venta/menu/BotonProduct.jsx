import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function BotonProduct({ product, onClick }) {
  return (
    <Card
      onClick={() => onClick(product)}
      sx={{
        width: 90,              // ✅ Más pequeño
        height: 70,
        backgroundColor: "#ff8c69",
        borderRadius: 2,
        boxShadow: "none",
        cursor: "pointer",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none"
      }}
    >
      <CardContent
        sx={{
          p: 0.5,
          textAlign: "center",
          width: "100%",
          height: "100%",
          overflow: "hidden"
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <Typography
            variant="body2"
            fontWeight="bold"
            noWrap
            sx={{
              fontSize: "0.8rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            {product.code}
          </Typography>
          <Typography
            variant="caption"
            noWrap
            color="text.secondary"
            sx={{
              fontSize: "0.65rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
