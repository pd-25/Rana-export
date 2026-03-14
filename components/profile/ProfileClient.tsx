"use client";

import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import ChangePasswordModal from "./ChangePasswordModal";

export default function ProfileClient() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button
          variant="contained"
          onClick={() => setModalOpen(true)}
          sx={{
            bgcolor: "#2D2D2D",
            borderRadius: 2,
            px: 4,
            py: 1.5,
            textTransform: "none",
            "&:hover": { bgcolor: "#000" },
          }}
        >
          Change Password
        </Button>
      </Stack>
      <ChangePasswordModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
