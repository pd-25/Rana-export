"use client";

import React, { useState, useEffect } from "react";
import { updateProduct, deleteProductImage } from "../../actions";
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
  Close as CloseIcon,
} from "@mui/icons-material";

export default function ProductFormEdit({ categories, product, variantGroups }: { categories: any[]; product: any; variantGroups: any[] }) {
  const [loading, setLoading] = useState(false);

  // Dynamic Variants state
  const [variantFields, setVariantFields] = useState<string[]>([]);
  const [variantRows, setVariantRows] = useState<any[]>([]);

  // Previews
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);

  // Initialize variants from existing product data
  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      // Collect all unique fields across all variants
      const fields = new Set<string>();
      product.variants.forEach((v: any) => {
        Object.keys(v.data).forEach(key => fields.add(key));
      });
      
      const fieldList = fields.size > 0 ? Array.from(fields) : ["Weight (gm)", "Size (cm)", "Total Weight"];
      setVariantFields(fieldList);
      
      setVariantRows(product.variants.map((v: any) => ({
        id: v.id,
        data: v.data
      })));
    } else {
      setVariantFields(["Weight (gm)", "Size (cm)", "Total Weight"]);
      setVariantRows([{ id: Date.now(), data: {} }]);
    }
  }, [product.variants]);

  const handleVariantGroupChange = (groupId: any) => {
    const group = variantGroups.find(g => g.id === groupId);
    if (group) {
      setVariantFields(group.fields);
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
    const newField = prompt("Enter new variant field name:");
    if (newField && !variantFields.includes(newField)) {
      setVariantFields([...variantFields, newField]);
    }
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

        // Handle Dynamic Variants
        variantRows.forEach(row => {
          formData.append('variantData[]', JSON.stringify(row.data));
        });

        await updateProduct(product.id, formData);
        setLoading(false);
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
                <TextField label="Product Name" name="name" defaultValue={product.name} required fullWidth variant="outlined" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField label="SKU" name="sku" defaultValue={product.sku} fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField label="Model No (Product)" name="modelNo" defaultValue={product.modelNo} fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField label="EAN (Barcode)" name="ean" defaultValue={product.ean} fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth required>
                      <InputLabel id="category-label">Category</InputLabel>
                      <Select labelId="category-label" name="categoryId" label="Category" defaultValue={product.categoryId} sx={{ borderRadius: 2 }}>
                        {categories.map((cat) => (
                          <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <TextField label="Description" name="description" defaultValue={product.description} fullWidth multiline rows={6} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
              </Stack>
            </Paper>

            <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Specifications & Shipping</Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField label="Material" name="material" defaultValue={product.material} fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField label="Packaging" name="packaging" defaultValue={product.packaging} fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField label="Country of Origin" name="origin" defaultValue={product.origin} fullWidth sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField label="Shipping Details" name="shippingDetails" defaultValue={product.shippingDetails} fullWidth multiline  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                </Grid>
              </Grid>
            </Paper>

          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={4}>
            <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <FormControlLabel control={<Switch name="isActive" defaultChecked={product.isActive} color="success" />} label={<Typography sx={{ fontWeight: 700 }}>Published (Active)</Typography>} />
              <Divider sx={{ my: 2 }} />
              <Button type="submit" variant="contained" fullWidth size="large" disabled={loading} startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />} sx={{ borderRadius: 2, py: 1.5, fontWeight: 700 }}>
                {loading ? "Updating..." : "Save Changes"}
              </Button>
            </Paper>

            <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Main Image</Typography>
              {product.mainImage && <Avatar src={product.mainImage} variant="rounded" sx={{ width: '100%', height: 200, mb: 2, borderRadius: 2 }} />}
              <Button component="label" variant="outlined" fullWidth startIcon={<UploadIcon />} sx={{ borderStyle: 'dashed', borderRadius: 2 }}>
                Update Photo
                <input type="file" name="mainImage" hidden accept="image/*" />
              </Button>

              <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>Gallery</Typography>
              {product.gallery && product.gallery.length > 0 && (
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  {product.gallery.map((img: any) => (
                    <Grid size={{ xs: 4 }} key={img.id} sx={{ position: 'relative' }}>
                      <Avatar src={img.url} variant="rounded" sx={{ width: '100%', height: 80, border: '1px solid', borderColor: 'divider' }} />
                      <Box sx={{ position: 'absolute', top: -4, right: -4, zIndex: 2 }}>
                        <IconButton size="small" onClick={async () => { if (confirm("Delete this?")) await deleteProductImage(img.id, product.id); }} sx={{ bgcolor: 'error.main', color: 'white', width: 20, height: 20, '&:hover': { bgcolor: 'error.dark' } }}>
                          <CloseIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
              <Button component="label" variant="outlined" fullWidth startIcon={<AddIcon />} sx={{ borderStyle: 'dashed', borderRadius: 2 }}>
                Upload More
                <input type="file" name="gallery" multiple hidden accept="image/*" />
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
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Load Group</InputLabel>
                  <Select label="Load Group" defaultValue="" onChange={(e) => handleVariantGroupChange(e.target.value)} sx={{ borderRadius: 2 }}>
                    {variantGroups.map(g => (
                      <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button variant="outlined" startIcon={<AddIcon />} size="small" onClick={addCustomField} sx={{ borderRadius: 2 }}>Field</Button>
                <Button variant="contained" startIcon={<AddIcon />} size="small" onClick={addVariantRow} sx={{ borderRadius: 2 }}>Row</Button>
              </Stack>
            </Box>

            <Box sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {variantFields.map(field => (
                      <TableCell key={field} sx={{ fontWeight: 700 }}>{field}</TableCell>
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
