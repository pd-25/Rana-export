"use client";
import React, { useState } from "react";
import { createCategory } from "../actions";
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
} from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";

export default function CategoryForm({ parents }: { parents: any[] }) {
  const [loading, setLoading] = useState(false);
  const [parentId, setParentId] = useState("");

  return (
    <Box
      component="form"
      action={async (formData) => {
        setLoading(true);
        await createCategory(formData);
      }}
      noValidate
    >
      <Stack spacing={4}>
        <TextField
          label="Category Name"
          name="name"
          placeholder="e.g. Cotton Fabrics"
          fullWidth
          required
          variant="outlined"
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />

        <TextField
          label="Sub Heading"
          name="subHeading"
          placeholder="e.g. Quality Fabrics for Your Needs"
          fullWidth
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
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="">
              <em>None (Top Level)</em>
            </MenuItem>
            {parents.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.parentId ? "— " : ""}
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {parentId === "" && (
          <FormControlLabel
            control={<Switch name="showOnHome" color="primary" />}
            label={
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Show on Home Page
              </Typography>
            }
          />
        )}

        <TextField
          label="Description"
          name="description"
          placeholder="Describe this category..."
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />

        <Box>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ fontWeight: 600, color: "text.secondary", ml: 0.5 }}
          >
            Category Image
          </Typography>
          <TextField
            name="image"
            type="file"
            fullWidth
            inputProps={{ accept: "image/*" }}
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />
        </Box>

        <FormControlLabel
          control={<Switch name="isActive" defaultChecked color="success" />}
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
            {loading ? "Saving..." : "Create Category"}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
