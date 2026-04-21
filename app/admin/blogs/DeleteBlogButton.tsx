"use client";

import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { deleteBlog } from "@/app/actions/blogActions";

export default function DeleteBlogButton({ id }: { id: number }) {
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      await deleteBlog(id);
    }
  };

  return (
    <Tooltip title="Delete Post">
      <IconButton size="small" color="error" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}
