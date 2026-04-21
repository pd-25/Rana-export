"use client";

import React, { useState } from "react";
import { IconButton, Tooltip, CircularProgress } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { deleteEnquiry } from "@/app/actions/enquiryActions";

export default function DeleteEnquiryButton({ id }: { id: number }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;

    setLoading(true);
    const result = await deleteEnquiry(id);
    setLoading(false);

    if (!result.success) {
      alert(result.error || "Failed to delete enquiry");
    }
  };

  return (
    <Tooltip title="Delete Enquiry">
      <IconButton 
        size="small" 
        color="error" 
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? <CircularProgress size={18} /> : <DeleteIcon />}
      </IconButton>
    </Tooltip>
  );
}
