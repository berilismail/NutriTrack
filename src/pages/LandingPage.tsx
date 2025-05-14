import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

export default function LandingPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('./media/pic.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="img"
        src="./media/overlay.png"
        alt="Overlay"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.7,
        }}
      />
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <Typography variant="h2" fontWeight="bold" mb={4}>
          Welcome to <i>NutriTrack</i>
        </Typography>
        <Link to="/log-in" style={{ textDecoration: "none" }}>
          <Button variant="contained"
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
          >
            Start
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
