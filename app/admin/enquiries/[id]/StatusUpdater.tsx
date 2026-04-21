"use client";

import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { updateEnquiryStatus } from "@/app/actions/enquiryActions";

export default function StatusUpdater({
  id,
  currentStatus,
}: {
  id: number;
  currentStatus: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = async (event: any) => {
    const newStatus = event.target.value;
    setLoading(true);
    const result = await updateEnquiryStatus(id, newStatus);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  return (
    <FormControl size="small" sx={{ minWidth: 150 }}>
      {loading && (
        <CircularProgress
          size={20}
          sx={{ position: "absolute", right: 35, top: 10, zIndex: 1 }}
        />
      )}
      <InputLabel id="status-label">Status</InputLabel>
      <Select
        labelId="status-label"
        value={currentStatus}
        label="Status"
        onChange={handleChange}
        disabled={loading}
        sx={{ borderRadius: 2 }}
      >
        <MenuItem value="NEW">New</MenuItem>
        <MenuItem value="READ">Read</MenuItem>
        <MenuItem value="REPLIED">Replied</MenuItem>
      </Select>
    </FormControl>
  );
}
