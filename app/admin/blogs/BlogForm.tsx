"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Typography,
  CircularProgress,
  Stack,
  Paper,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Save as SaveIcon,
  CloudUpload as UploadIcon,
  ArrowBack as BackIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { createBlog, updateBlog } from "@/app/actions/blogActions";
import Link from "next/link";

export default function BlogForm({ initialData }: { initialData?: any }) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      if (initialData?.id) {
        await updateBlog(initialData.id, formData);
      } else {
        await createBlog(formData);
      }
    } catch (error: any) {
      alert(error.message || "Failed to save blog post.");
      setLoading(false);
    }
  };

  return (
    <Box component="form" action={handleSubmit}>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            {initialData ? "Edit blog Post" : "Create New Blog Post"}
          </Typography>
          <Link href="/admin/blogs" passHref style={{ textDecoration: "none" }}>
            <Button startIcon={<BackIcon />} sx={{ color: "text.secondary", mt: 1 }}>
              Back to Blogs
            </Button>
          </Link>
        </Box>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
          sx={{ 
            borderRadius: 2, 
            bgcolor: "#2D2D2D", 
            fontWeight: 700, 
            px: 4,
            "&:hover": { bgcolor: "#000" }
          }}
        >
          {loading ? "Saving..." : "Save Post"}
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 4, borderRadius: 3, elevation: 1 }}>
            <Stack spacing={3}>
              <TextField
                label="Post Title"
                name="title"
                defaultValue={initialData?.title}
                required
                fullWidth
                placeholder="Enter a compelling title"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
              
              <TextField
                label="Excerpt"
                name="excerpt"
                defaultValue={initialData?.excerpt}
                fullWidth
                multiline
                rows={2}
                placeholder="Short summary for the blog list page"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />

              <Divider />
              
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "text.secondary" }}>
                CONTENT
              </Typography>
              <TextField
                label="Main Content"
                name="content"
                defaultValue={initialData?.content}
                required
                fullWidth
                multiline
                rows={15}
                placeholder="Write your blog content here. You can use HTML tags for basic formatting."
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={4}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Settings
              </Typography>
              <Stack spacing={2}>
                <FormControlLabel
                  control={<Switch name="isActive" defaultChecked={initialData ? initialData.isActive : true} color="success" />}
                  label="Status: Published"
                />
                <TextField
                  label="Author"
                  name="author"
                  defaultValue={initialData?.author || "Admin"}
                  fullWidth
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Stack>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Featured Image
              </Typography>
              <Box 
                sx={{ 
                  width: "100%", 
                  height: 200, 
                  bgcolor: "#f5f5f5", 
                  borderRadius: 2, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  overflow: "hidden",
                  border: "2px dashed #ddd",
                  position: "relative",
                  mb: 2
                }}
              >
                {imagePreview ? (
                  <>
                    <Box component="img" src={imagePreview} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <IconButton 
                      size="small" 
                      onClick={() => setImagePreview(null)}
                      sx={{ position: "absolute", top: 8, right: 8, bgcolor: "rgba(255,255,255,0.8)" }}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </>
                ) : (
                  <Typography variant="body2" color="text.secondary">No image selected</Typography>
                )}
              </Box>
              <Button
                component="label"
                variant="outlined"
                fullWidth
                startIcon={<UploadIcon />}
                sx={{ borderRadius: 2 }}
              >
                Upload Image
                <input type="file" hidden name="image" accept="image/*" onChange={handleImageChange} />
              </Button>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
