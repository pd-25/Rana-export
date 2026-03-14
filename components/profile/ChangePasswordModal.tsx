"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Alert,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { changePassword } from "@/app/actions/userActions";

export default function ChangePasswordModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const result = await changePassword(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess("Password changed successfully!");
      setLoading(false);
      setTimeout(() => {
        onClose();
        setSuccess(null);
      }, 2000);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      sx={{ borderRadius: 4 }}
    >
      <DialogTitle sx={{ fontWeight: 800, pr: 6 }}>
        Change Password
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <TextField
              required
              fullWidth
              name="currentPassword"
              label="Current Password"
              type="password"
              variant="outlined"
            />
            <TextField
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              variant="outlined"
            />
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              variant="outlined"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} sx={{ color: "text.secondary" }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              bgcolor: "#2D2D2D",
              "&:hover": { bgcolor: "#000" },
              borderRadius: 2,
              px: 4,
            }}
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
