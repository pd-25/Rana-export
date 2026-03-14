"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Stack,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import { registerUser } from "@/app/actions/authActions";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setError("");
    setLoading(true);
    const result = await registerUser(null, formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      window.location.href = "/profile";
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper
        elevation={0}
        sx={{ p: 4, borderRadius: 4, border: "1px solid #eee" }}
      >
        <Stack spacing={3}>
          <Box textAlign="center">
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Create Account
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Join us today! Please enter your details.
            </Typography>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" action={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                name="name"
                label="Full Name"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                name="email"
                label="Email Address"
                variant="outlined"
                type="email"
                required
              />
              <TextField
                fullWidth
                name="password"
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                disabled={loading}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  backgroundColor: "#222",
                  "&:hover": { backgroundColor: "#444" },
                }}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>
            </Stack>
          </Box>

          <Box textAlign="center">
            <Typography variant="body2">
              Already have an account?{" "}
              <Link
                href="/login"
                style={{
                  color: "#222",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Log in
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
