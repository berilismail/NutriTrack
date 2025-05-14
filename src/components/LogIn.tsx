import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box, CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";


const LogIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is empty"),
    password: Yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.{8,})/,
      "Must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
    ),  })

  const handleLogin = async (values: { username: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: values.username,
        password: values.password,
      });

      if (response.data) {
        localStorage.setItem("userToken", response.data.token);
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box
      sx={{
        minHeight: "86vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        p: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 400 }}>
        <Typography variant="h3" textAlign="center" mb={3}>
          Login
        </Typography>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                name="username"
                label="Username"
                fullWidth
                sx={{ mb: 2 }}
                variant="outlined"
                error={!!error}
                helperText={<ErrorMessage name="username" />}
              />

              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                fullWidth
                sx={{ mb: 2 }}
                variant="outlined"
                error={!!error}
                helperText={<ErrorMessage name="password" />}
              />

              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting || loading}
                sx={{ py: 1.5, fontSize: "16px" }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default LogIn;
