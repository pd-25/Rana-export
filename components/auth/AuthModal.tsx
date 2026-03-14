"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  TextField,
  Button,
  Stack,
  Divider,
  InputAdornment,
  Alert,
} from "@mui/material";
import {
  Close as CloseIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { loginUser, registerUser } from "@/app/actions/authActions";
import Link from "next/link";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
}

export default function AuthModal({
  open,
  onClose,
  initialMode = "login",
}: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleToggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setError("");
  };

  const handleAction = async (formData: FormData) => {
    setError("");
    setLoading(true);
    const result =
      mode === "login"
        ? await loginUser(null, formData)
        : await registerUser(null, formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      // Success is handled by redirect in server actions
      // But for modal, we might want to refresh or close
      onClose();
      window.location.reload();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 4, position: "relative", overflow: "visible" },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: -40,
          right: -40,
          color: "#fff",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
          display: { xs: "none", sm: "flex" },
        }}
      >
        <CloseIcon sx={{ fontSize: 32 }} />
      </IconButton>

      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "#999",
          display: { xs: "flex", sm: "none" },
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box sx={{ borderBottom: "1px solid #eee", p: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          {mode === "login" ? "Sign-in / Sign-up" : "Create Account"}
        </Typography>
      </Box>

      <DialogContent sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Box textAlign="center">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {mode === "login" ? "Welcome Back" : "Join Us"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {mode === "login"
                ? "Enter your details to proceed"
                : "Fill in the details to create your account"}
            </Typography>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" action={handleAction}>
            <Stack spacing={2.5}>
              {mode === "register" && (
                <TextField
                  fullWidth
                  name="name"
                  label="Full Name"
                  variant="outlined"
                  required
                />
              )}
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
                  py: 1.8,
                  borderRadius: 2.5,
                  backgroundColor: "#AF7171", // Matching the reddish-brown in the image
                  "&:hover": { backgroundColor: "#8E5E5E" },
                  textTransform: "none",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                }}
              >
                {loading
                  ? "Processing..."
                  : mode === "login"
                    ? "Continue"
                    : "Sign Up"}
              </Button>
            </Stack>
          </Box>

          <Box textAlign="center">
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontSize: "0.75rem", mb: 2 }}
            >
              This site is protected by reCAPTCHA and the Google <br />
              <Link href="#" style={{ color: "#AF7171" }}>
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="#" style={{ color: "#AF7171" }}>
                Terms of service
              </Link>{" "}
              apply.
            </Typography>

            <Box sx={{ bgcolor: "#FFFAF6", p: 1.5, borderRadius: 2 }}>
              <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                By continuing, I agree with{" "}
                <span style={{ color: "#AF7171" }}>
                  Rana Export Trading House
                </span>{" "}
                <br />
                Privacy Policy and Terms of Service
              </Typography>
            </Box>

            <Button
              onClick={handleToggleMode}
              sx={{ mt: 2, textTransform: "none", color: "#666" }}
            >
              {mode === "login"
                ? "Don't have an account? Create one"
                : "Already have an account? Sign in"}
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
