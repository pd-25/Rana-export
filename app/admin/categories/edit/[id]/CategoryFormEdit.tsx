"use client";
import React, { useState } from "react";
import { updateCategory } from "../../actions";
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  CircularProgress,
  Stack,
  Divider,
  Avatar,
} from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";

export default function CategoryFormEdit({ category, parents }: { category: any, parents: any[] }) {
  const [loading, setLoading] = useState(false);

  return (
    <Box
      component="form"
      action={async (formData) => {
        setLoading(true);
        await updateCategory(category.id, formData);
        setLoading(false);
      }}
      noValidate
    >
      <Stack spacing={4}>
        <TextField
          label="Category Name"
          name="name"
          defaultValue={category.name}
          fullWidth
          required
          variant="outlined"
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />

        <FormControl fullWidth>
          <InputLabel id="parent-label">Parent Category (Optional)</InputLabel>
          <Select
            labelId="parent-label"
            id="parent-select"
            name="parentId"
            label="Parent Category (Optional)"
            defaultValue={category.parentId || ""}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="">
              <em>None (Top Level)</em>
            </MenuItem>
            {parents.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.parentId ? "— " : ""}{p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Description"
          name="description"
          defaultValue={category.description || ""}
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />

        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: "text.secondary", ml: 0.5 }}>
            Current Image
          </Typography>
          {category.image && (
            <Avatar
              src={category.image}
              variant="rounded"
              sx={{ width: 100, height: 100, mb: 2, border: '1px solid', borderColor: 'divider', boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
            />
          )}
          <TextField
            label="Update Image"
            name="image"
            type="file"
            fullWidth
            inputProps={{ accept: "image/*" }}
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
            Leave empty to keep current image
          </Typography>
        </Box>

        <FormControlLabel
          control={<Switch name="isActive" defaultChecked={category.isActive} color="success" />}
          label={
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Active (Visible on site)
            </Typography>
          }
        />

        <Divider />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
            sx={{ px: 4, borderRadius: 2 }}
          >
            {loading ? "Updating..." : "Save Changes"}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
