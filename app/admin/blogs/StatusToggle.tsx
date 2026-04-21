"use client";

import React, { useState } from "react";
import { Chip, CircularProgress } from "@mui/material";
import { toggleBlogStatus } from "@/app/actions/blogActions";

export default function StatusToggle({ id, isActive }: { id: number; isActive: boolean }) {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    await toggleBlogStatus(id, !isActive);
    setLoading(false);
  };

  return (
    <Chip
      label={isActive ? "ACTIVE" : "DRAFT"}
      size="small"
      color={isActive ? "success" : "default"}
      onClick={handleToggle}
      disabled={loading}
      icon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}
      sx={{ 
        fontWeight: 700, 
        borderRadius: 1,
        cursor: "pointer",
        "&:hover": { opacity: 0.8 }
      }}
    />
  );
}
