"use client";

import React, { useState } from "react";
import { createProduct } from "../actions";
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
  Grid,
  Paper,
  IconButton,
  Tooltip,
  Avatar,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import {
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
  Straighten as SizeIcon,
  Scale as WeightIcon,
  Close as CloseIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

export default function ProductForm({ categories, variantGroups }: { categories: any[]; variantGroups: any[] }) {
  const [loading, setLoading] = useState(false);
  
  // Dynamic Variants state
  // fields: Array of field names (e.g. ["Weight", "Size"])
  // items: Array of row data (e.g. [{"Weight": "450", "Size": "12"}])
  const [variantFields, setVariantFields] = useState<string[]>(["Weight (gm)", "Size (cm)", "Total Weight"]);
  const [variantRows, setVariantRows] = useState<any[]>([{ id: Date.now(), data: {} }]);
  
  // Previews
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);

  const handleVariantGroupChange = (groupId: any) => {
    const group = variantGroups.find(g => g.id === groupId);
    if (group) {
      setVariantFields(group.fields);
      // Map group items to our row format, adding unique IDs
      const newRows = group.items.map((item: any) => ({
        id: Math.random(), 
        data: item.data
      }));
      setVariantRows(newRows.length > 0 ? newRows : [{ id: Date.now(), data: {} }]);
    }
  };

  const addVariantRow = () => {
    setVariantRows([...variantRows, { id: Date.now(), data: {} }]);
  };

  const removeVariantRow = (id: number) => {
    if (variantRows.length > 1) {
      setVariantRows(variantRows.filter(v => v.id !== id));
    }
  };

  const updateVariantValue = (rowId: number, field: string, value: string) => {
    setVariantRows(prev => prev.map(row => 
      row.id === rowId ? { ...row, data: { ...row.data, [field]: value } } : row
    ));
  };

  const addCustomField = () => {
    const newField = prompt("Enter new variant field name (e.g. Color, Material, Liter):");
    if (newField && !variantFields.includes(newField)) {
      setVariantFields([...variantFields, newField]);
    }
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setGalleryFiles(prev => [...prev, ...files]);
  };

  const removeGalleryFile = (index: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setDocumentFiles(prev => [...prev, ...files]);
  };

  return (
    <Box
      component="form"
      action={async (formData) => {
        setLoading(true);
        
        // Handle Gallery
        formData.delete('gallery');
        galleryFiles.forEach(file => formData.append('gallery', file));
        
        // Handle Documents
        formData.delete('documents');
        documentFiles.forEach(file => formData.append('documents', file));

        // Handle Dynamic Variants: Save as JSON strings
        variantRows.forEach(row => {
          formData.append('variantData[]', JSON.stringify(row.data));
        });

        await createProduct(formData);
      }}
      noValidate
    >
      <Grid container spacing={4}>
        {/* Left Column: Basic Info */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={4}>
            <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Basic Information</Typography>
              <Stack spacing={3}>
                <TextField
                  label="Product Name"
                  name="name"
                  required
                  fullWidth
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField label="SKU" name="sku" fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField label="Model No (Product)" name="modelNo" fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField label="EAN (Barcode)" name="ean" fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth required>
                      <InputLabel id="category-label">Category</InputLabel>
                      <Select labelId="category-label" id="category-select" name="categoryId" label="Category" defaultValue="" sx={{ borderRadius: 2 }}>
                        {categories.map((cat) => (
                          <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <TextField label="Description" name="description" fullWidth multiline rows={6} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
              </Stack>
            </Paper>

            {/* Specifications */}
            <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Specifications & Shipping</Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField label="Material" name="material" fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField label="Packaging" name="packaging" fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField label="Country of Origin" name="origin" fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField label="Shipping Details" name="shippingDetails" fullWidth multiline  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                </Grid>
              </Grid>
            </Paper>

          </Stack>
        </Grid>

        {/* Right Column: Media & Actions */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={4}>
            <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <FormControlLabel
                control={<Switch name="isActive" defaultChecked color="success" />}
                label={<Typography sx={{ fontWeight: 700 }}>Published (Active)</Typography>}
              />
              <Divider sx={{ my: 2 }} />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                sx={{ borderRadius: 2, py: 1.5, fontWeight: 700 }}
              >
                {loading ? "Registering..." : "Create Product"}
              </Button>
            </Paper>

            <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Main Display Image</Typography>
              {mainImagePreview && (
                <Box sx={{ mb: 2, position: "relative" }}>
                  <Avatar src={mainImagePreview} variant="rounded" sx={{ width: '100%', height: 200, borderRadius: 2, border: '1px solid', borderColor: 'divider' }} />
                  <IconButton size="small" onClick={() => setMainImagePreview(null)} sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255,255,255,0.8)' }}>
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
                </Box>
              )}
              <Button component="label" variant="outlined" fullWidth startIcon={<UploadIcon />} sx={{ height: mainImagePreview ? 50 : 100, borderStyle: 'dashed', borderRadius: 2 }}>
                {mainImagePreview ? "Change Photo" : "Upload Photo"}
                <input type="file" name="mainImage" hidden accept="image/*" onChange={handleMainImageChange} />
              </Button>

              <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>Product Gallery</Typography>
              {galleryFiles.length > 0 && (
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  {galleryFiles.map((file, i) => (
                    <Grid size={{ xs: 4 }} key={i} sx={{ position: 'relative' }}>
                      <Avatar src={URL.createObjectURL(file)} variant="rounded" sx={{ width: '100%', height: 80, border: '1px solid', borderColor: 'divider' }} />
                      <IconButton size="small" onClick={() => removeGalleryFile(i)} sx={{ position: 'absolute', top: -4, right: -4, bgcolor: 'error.main', color: 'white', width: 20, height: 20 }}>
                        <CloseIcon sx={{ fontSize: 12 }} />
                      </IconButton>
                    </Grid>
                  ))}
                </Grid>
              )}
              <Button component="label" variant="outlined" fullWidth startIcon={<AddIcon />} sx={{ height: 60, borderStyle: 'dashed', borderRadius: 2 }}>
                Add Multiple Photos
                <input type="file" name="gallery" multiple hidden accept="image/*" onChange={handleGalleryChange} />
              </Button>
            </Paper>

            <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Important Documents (PDF)</Typography>
              {documentFiles.length > 0 && (
                <Stack spacing={1} sx={{ mb: 2 }}>
                  {documentFiles.map((file, i) => (
                    <Box key={i} sx={{ p: 1, bgcolor: 'grey.100', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="caption" noWrap sx={{ maxWidth: '80%' }}>{file.name}</Typography>
                      <IconButton size="small" onClick={() => setDocumentFiles(prev => prev.filter((_, idx) => idx !== i))}>
                        <DeleteIcon fontSize="inherit" color="error" />
                      </IconButton>
                    </Box>
                  ))}
                </Stack>
              )}
              <Button component="label" variant="outlined" fullWidth startIcon={<UploadIcon />} sx={{ borderRadius: 2 }}>
                Attach PDF Files
                <input type="file" name="documents" multiple hidden accept="application/pdf" onChange={handleDocumentChange} />
              </Button>
            </Paper>
          </Stack>
        </Grid>

        {/* Variants Section - FULL WIDTH */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Flexible Variants</Typography>
                <Typography variant="body2" color="text.secondary">Use a template group or create custom fields</Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <InputLabel id="variant-group-label">Load From Group</InputLabel>
                  <Select
                    labelId="variant-group-label"
                    label="Load From Group"
                    defaultValue=""
                    onChange={(e) => handleVariantGroupChange(e.target.value)}
                    sx={{ borderRadius: 2 }}
                  >
                    {variantGroups.map(g => (
                      <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button variant="outlined" startIcon={<AddIcon />} size="small" onClick={addCustomField} sx={{ borderRadius: 2 }}>
                  New Field
                </Button>
                <Button variant="contained" startIcon={<AddIcon />} size="small" onClick={addVariantRow} sx={{ borderRadius: 2 }}>
                  Add Row
                </Button>
              </Stack>
            </Box>

            <Box sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {variantFields.map(field => (
                      <TableCell key={field} sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>{field}</TableCell>
                    ))}
                    <TableCell align="right" width={50}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {variantRows.map((row) => (
                    <TableRow key={row.id}>
                      {variantFields.map(field => (
                        <TableCell key={field}>
                          <TextField
                            size="small"
                            fullWidth
                            value={row.data[field] || ""}
                            onChange={(e) => updateVariantValue(row.id, field, e.target.value)}
                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1.5 }, minWidth: 100 }}
                          />
                        </TableCell>
                      ))}
                      <TableCell align="right">
                        <IconButton size="small" color="error" onClick={() => removeVariantRow(row.id)} disabled={variantRows.length === 1}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
