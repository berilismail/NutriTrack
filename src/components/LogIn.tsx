import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box, CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; 

const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error message before each login attempt

    try {
      // Send POST request to the dummyjson login API (replace the URL if you have a real API)
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: email,
        password: password,
      });

      // Assuming the response includes a token, handle login success
      if (response.data) {
        localStorage.setItem("userToken", response.data.token);
        navigate("/dashboard"); // Navigate to a different page on successful login
      }
    } catch (err: any) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "86vh",
          padding: 2,
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: 3 }}>
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            maxWidth: 400,
            width: "100%",
            padding: 3,
            borderRadius: 3,
            boxShadow: 3,
            backgroundColor: "white",
          }}
        >
          {/* Email input */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
            required
          />

          {/* Password input */}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: 3 }}
            required
          />

          {/* Error message */}
          {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}

          {/* Login button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ padding: "12px", fontSize: "16px" }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default LogIn;
