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
  Tabs,
  Tab,
} from "@mui/material";
import {
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
  Close as CloseIcon,
  Settings as SettingsIcon,
  SubdirectoryArrowRight as SubcategoryIcon,
} from "@mui/icons-material";

export default function ProductFormEdit({ categories, product, variantGroups }: { categories: any[]; product: any; variantGroups: any[] }) {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Dynamic Variants state
  const [variantFields, setVariantFields] = useState<string[]>([]);
  const [variantRows, setVariantRows] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState("");

  // Previews
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);

  // Initialize variants from existing product data
  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      // Collect all unique fields across all variants (excluding identity fields)
      const fields = new Set<string>();
      const identityKeys = ["SKU", "Model No", "EAN", "variantImage"];
      
      product.variants.forEach((v: any) => {
        Object.keys(v.data).forEach(key => {
          if (!identityKeys.includes(key)) fields.add(key);
        });
      });
      
      const fieldList = Array.from(fields);
      if (fieldList.length === 0) {
        setVariantFields(["Weight (gm)", "Size (cm)", "Total Weight"]);
      } else {
        setVariantFields(fieldList);
      }
      
      setVariantRows(product.variants.map((v: any) => ({
        id: v.id,
        // Ensure SKU, Model No, EAN exist in the data even if they were legacy top-level
        data: { 
          SKU: v.data.SKU || product.sku || "", 
          "Model No": v.data["Model No"] || product.modelNo || "", 
          EAN: v.data.EAN || product.ean || "",
          ...v.data 
        },
        imagePreview: v.data.variantImage || null,
        imageFile: null
      })));
    } else {
      setVariantFields(["Weight (gm)", "Size (cm)", "Total Weight"]);
      setVariantRows([{ 
        id: Date.now(), 
        data: { SKU: product.sku || "", "Model No": product.modelNo || "", EAN: product.ean || "" },
        imagePreview: null,
        imageFile: null
      }]);
    }
  }, [product]);

  const handleVariantGroupChange = (groupId: any) => {
    if (!groupId) return;
    const group = variantGroups.find(g => String(g.id) === String(groupId));
    if (group) {
      setVariantFields(group.fields);
      setSelectedGroup(groupId);
    }
  };

  const addVariantRow = () => {
    const newId = Date.now();
    setVariantRows([...variantRows, { 
      id: newId, 
      data: { SKU: "", "Model No": "", EAN: "" },
      imagePreview: null,
      imageFile: null
    }]);
    setActiveTab(variantRows.length);
  };

  const removeVariantRow = (id: number) => {
    if (variantRows.length > 1) {
      const filtered = variantRows.filter(v => v.id !== id);
      setVariantRows(filtered);
      if (activeTab >= filtered.length) {
        setActiveTab(Math.max(0, filtered.length - 1));
      }
    }
  };

  const updateVariantValue = (rowId: number, field: string, value: string) => {
    setVariantRows(prev => prev.map(row => 
      row.id === rowId ? { ...row, data: { ...row.data, [field]: value } } : row
    ));
  };

  const handleVariantImageChange = (rowId: number, file: File | null) => {
    setVariantRows(prev => prev.map(row => 
      row.id === rowId ? { 
        ...row, 
        imageFile: file, 
        imagePreview: file ? URL.createObjectURL(file) : null 
      } : row
    ));
  };

  const addCustomField = () => {
    const newField = prompt("Enter new variant field name:");
    if (newField && !variantFields.includes(newField)) {
      setVariantFields([...variantFields, newField]);
    }
  };

  const formatCategories = (allCats: any[]) => {
    const flattened: any[] = [];
    const map: Record<number, any> = {};
    allCats.forEach(cat => map[cat.id] = { ...cat, children: [] });
    const roots: any[] = [];
    allCats.forEach(cat => {
      if (cat.parentId && map[cat.parentId]) {
        map[cat.parentId].children.push(map[cat.id]);
      } else {
        roots.push(map[cat.id]);
      }
    });
    const traverse = (nodes: any[], depth = 0) => {
      nodes.forEach(node => {
        flattened.push({ ...node, depth });
        if (node.children) traverse(node.children, depth + 1);
      });
    };
    traverse(roots);
    return flattened;
  };

  const formattedCategories = formatCategories(categories);

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
        formData.delete('variantData[]');
        variantRows.forEach((row, index) => {
          formData.append('variantData[]', JSON.stringify(row.data));
          if (row.imageFile) {
            formData.append(`variantImage_${index}`, row.imageFile);
          }
        });

        await updateProduct(product.id, formData);
        setLoading(false);
      }}
      noValidate
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 4, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
            Edit Product: {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Update your product and its multiple variations
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
           <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
            sx={{ borderRadius: 2 }}
          >
            Save Changes
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={4}>
            <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Product Details</Typography>
              <Stack spacing={3}>
                <TextField label="Product Name" name="name" defaultValue={product.name} fullWidth required sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                <FormControl fullWidth required>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select 
                    labelId="category-label" 
                    name="categoryId" 
                    label="Category" 
                    defaultValue={product.categoryId} 
                    sx={{ borderRadius: 2 }}
                    renderValue={(selected) => {
                      const cat = formattedCategories.find(c => c.id === selected);
                      return cat ? cat.name : "";
                    }}
                  >
                    {formattedCategories.map((cat) => (
                      <MenuItem 
                        key={cat.id} 
                        value={cat.id}
                        sx={{ 
                          pl: cat.depth * 3 + 2,
                          py: 1.5,
                          borderBottom: '1px solid',
                          borderColor: 'grey.100',
                          '&:last-child': { borderBottom: 0 }
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {cat.depth > 0 && <SubcategoryIcon sx={{ fontSize: '1rem', color: 'text.secondary', opacity: 0.6 }} />}
                          <Typography variant="body2" sx={{ fontWeight: cat.depth === 0 ? 700 : 400 }}>
                            {cat.name}
                          </Typography>
                        </Stack>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField label="Description" name="description" defaultValue={product.description} fullWidth multiline rows={4} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
              </Stack>
            </Paper>

            {/* Variations Section */}
            <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>1. Variation Template</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Select a group or create custom fields to define "Dynamic Fields"</Typography>
                  <Stack direction="row" spacing={1}>
                    <FormControl size="small" sx={{ minWidth: 220 }}>
                      <InputLabel id="variant-group-label">Template Group</InputLabel>
                      <Select
                        labelId="variant-group-label"
                        label="Template Group"
                        value={selectedGroup}
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
                  </Stack>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>2. Add Variation</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Create multiple items</Typography>
                  <Button 
                    variant="contained" 
                    startIcon={<AddIcon />} 
                    size="small" 
                    onClick={addVariantRow}
                    sx={{ borderRadius: 2, px: 3, fontWeight: 700 }}
                  >
                    Add New Varient
                  </Button>
                </Box>
              </Box>

              <Tabs 
                value={activeTab} 
                onChange={(e, v) => setActiveTab(v)} 
                variant="scrollable" 
                scrollButtons="auto"
                sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
              >
                {variantRows.map((row, index) => (
                  <Tab key={row.id} label={`Varient ${index + 1}`} sx={{ fontWeight: 700 }} />
                ))}
              </Tabs>

              {variantRows[activeTab] && (
                <Box>
                  <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 8 }}>
                       <Grid container spacing={2}>
                          <Grid size={{ xs: 12, md: 6 }}>
                             <TextField 
                              label="SKU" 
                              fullWidth 
                              value={variantRows[activeTab].data["SKU"] || ""}
                              onChange={(e) => updateVariantValue(variantRows[activeTab].id, "SKU", e.target.value)}
                              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 6 }}>
                             <TextField 
                              label="Model No (Product)" 
                              fullWidth 
                              value={variantRows[activeTab].data["Model No"] || ""}
                              onChange={(e) => updateVariantValue(variantRows[activeTab].id, "Model No", e.target.value)}
                              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                            />
                          </Grid>
                          <Grid size={{ xs: 12 }}>
                             <TextField 
                              label="EAN (Barcode)" 
                              fullWidth 
                              value={variantRows[activeTab].data["EAN"] || ""}
                              onChange={(e) => updateVariantValue(variantRows[activeTab].id, "EAN", e.target.value)}
                              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                            />
                          </Grid>
                          
                          <Grid size={{ xs: 12 }}><Divider sx={{ my: 1 }}><Typography variant="caption" color="text.secondary">Dynamic Fields</Typography></Divider></Grid>

                          {variantFields.map(field => (
                            <Grid size={{ xs: 12, md: 6 }} key={field}>
                              <TextField
                                label={field}
                                fullWidth
                                value={variantRows[activeTab].data[field] || ""}
                                onChange={(e) => updateVariantValue(variantRows[activeTab].id, field, e.target.value)}
                                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                              />
                            </Grid>
                          ))}
                       </Grid>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Variant Photo</Typography>
                      {variantRows[activeTab].imagePreview ? (
                        <Box sx={{ position: "relative" }}>
                          <Avatar 
                            src={variantRows[activeTab].imagePreview} 
                            variant="rounded" 
                            sx={{ width: '100%', height: 180, borderRadius: 2, border: '1px solid', borderColor: 'divider' }} 
                          />
                          <IconButton 
                            size="small" 
                            onClick={() => handleVariantImageChange(variantRows[activeTab].id, null)} 
                            sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255,255,255,0.8)' }}
                          >
                            <DeleteIcon fontSize="small" color="error" />
                          </IconButton>
                        </Box>
                      ) : (
                        <Button 
                          component="label" 
                          variant="outlined" 
                          fullWidth 
                          startIcon={<UploadIcon />} 
                          sx={{ height: 180, borderStyle: 'dashed', borderRadius: 2, flexDirection: 'column', gap: 1 }}
                        >
                          Upload Photo
                          <input 
                            type="file" 
                            hidden 
                            accept="image/*" 
                            onChange={(e) => handleVariantImageChange(variantRows[activeTab].id, e.target.files?.[0] || null)} 
                          />
                        </Button>
                      )}
                      
                      {variantRows.length > 1 && (
                        <Button 
                          color="error" 
                          size="small" 
                          startIcon={<DeleteIcon />} 
                          onClick={() => removeVariantRow(variantRows[activeTab].id)}
                          sx={{ mt: 2, fontWeight: 700 }}
                        >
                          Remove This Variation
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              )}
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
                  <TextField label="Shipping Details" name="shippingDetails" defaultValue={product.shippingDetails} fullWidth multiline rows={2} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                </Grid>
              </Grid>
            </Paper>
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={4}>
            <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <FormControlLabel 
                control={<Switch name="isActive" defaultChecked={product.isActive} color="success" />} 
                label={<Typography sx={{ fontWeight: 700 }}>Published (Active)</Typography>} 
              />
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Main Display Image</Typography>
              {product.mainImage && <Avatar src={product.mainImage} variant="rounded" sx={{ width: '100%', height: 200, mb: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }} />}
              <Button component="label" variant="outlined" fullWidth startIcon={<UploadIcon />} sx={{ borderStyle: 'dashed', borderRadius: 2 }}>
                Change Main Photo
                <input type="file" name="mainImage" hidden accept="image/*" />
              </Button>

              <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>Product Gallery</Typography>
              {product.gallery && product.gallery.length > 0 && (
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  {product.gallery.map((img: any) => (
                    <Grid size={{ xs: 4 }} key={img.id} sx={{ position: 'relative' }}>
                      <Avatar src={img.url} variant="rounded" sx={{ width: '100%', height: 80, border: '1px solid', borderColor: 'divider' }} />
                      <Box sx={{ position: 'absolute', top: -4, right: -4, zIndex: 2 }}>
                        <IconButton size="small" onClick={async () => { if (confirm("Delete this gallery image?")) await deleteProductImage(img.id, product.id); }} sx={{ bgcolor: 'error.main', color: 'white', width: 20, height: 20, '&:hover': { bgcolor: 'error.dark' } }}>
                          <CloseIcon sx={{ fontSize: 12 }} />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
              <Button component="label" variant="outlined" fullWidth startIcon={<AddIcon />} sx={{ borderStyle: 'dashed', borderRadius: 2 }}>
                Add More to Gallery
                <input type="file" name="gallery" multiple hidden accept="image/*" />
              </Button>
            </Paper>

            <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Documents (PDF)</Typography>
              {product.documents && product.documents.length > 0 && (
                <Stack spacing={1} sx={{ mb: 2 }}>
                  {product.documents.map((doc: any) => (
                    <Box key={doc.id} sx={{ p: 1, bgcolor: 'grey.100', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="caption" noWrap sx={{ maxWidth: '80%' }}>{doc.name}</Typography>
                      <IconButton size="small">
                        <DeleteIcon fontSize="inherit" color="error" />
                      </IconButton>
                    </Box>
                  ))}
                </Stack>
              )}
              <Button component="label" variant="outlined" fullWidth startIcon={<UploadIcon />} sx={{ borderRadius: 2 }}>
                Upload New PDFs
                <input type="file" name="documents" multiple hidden accept="application/pdf" />
              </Button>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
