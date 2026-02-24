"use client";

import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Box,
} from "@mui/material";
import { updateOrderStatus } from "../actions";

const statuses = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function UpdateStatusDropdown({
  orderId,
  currentStatus,
}: {
  orderId: number;
  currentStatus: string;
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(currentStatus);

  const handleChange = async (event: any) => {
    const newStatus = event.target.value;
    setLoading(true);
    setStatus(newStatus);
    
    const result = await updateOrderStatus(orderId, newStatus);
    
    if (!result.success) {
      alert("Failed to update status");
      setStatus(currentStatus);
    }
    
    setLoading(false);
  };

  return (
    <Box sx={{ minWidth: 200, display: "flex", alignItems: "center", gap: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="order-status-label">Update Status</InputLabel>
        <Select
          labelId="order-status-label"
          value={status}
          label="Update Status"
          onChange={handleChange}
          disabled={loading}
          sx={{ borderRadius: 2 }}
        >
          {statuses.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {loading && <CircularProgress size={20} />}
    </Box>
  );
}
