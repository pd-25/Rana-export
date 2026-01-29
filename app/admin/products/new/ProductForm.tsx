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
} from "@mui/material";
import {
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
  Straighten as SizeIcon,
  Scale as WeightIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

export default function ProductForm({ categories }: { categories: any[] }) {
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState([{ id: Date.now(), weight: "", size: "", totalWeight: "" }]);
  
  // Previews
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);

  const addVariant = () => {
    setVariants([...variants, { id: Date.now(), weight: "", size: "", totalWeight: "" }]);
  };

  const removeVariant = (id: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter(v => v.id !== id));
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
        // Standard gallery input is ignored, we use our state
        formData.delete('gallery');
        galleryFiles.forEach(file => formData.append('gallery', file));
        
        // Same for documents
        formData.delete('documents');
        documentFiles.forEach(file => formData.append('documents', file));

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
                  placeholder="e.g. Handmade Singing Bowl"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="SKU"
                      name="sku"
                      fullWidth
                      placeholder="HSB19363"
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Model No (Product)"
                      name="modelNo"
                      fullWidth
                      placeholder="NE0265/111"
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="EAN (Barcode)"
                      name="ean"
                      fullWidth
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth required>
                      <InputLabel id="category-label">Category</InputLabel>
                      <Select
                        labelId="category-label"
                        id="category-select"
                        name="categoryId"
                        label="Category"
                        defaultValue=""
                        sx={{ borderRadius: 2 }}
                      >
                        {categories.map((cat) => (
                          <MenuItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  multiline
                  rows={6}
                  placeholder="Describe your product here..."
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              </Stack>
            </Paper>

            {/* Specifications */}
            <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Specifications & Shipping</Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField label="Material" name="material" fullWidth placeholder="Bronze" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField label="Packaging" name="packaging" fullWidth placeholder="Textile pouch" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField label="Country of Origin" name="origin" fullWidth placeholder="India" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField label="Shipping Details" name="shippingDetails" fullWidth multiline rows={2} placeholder="677, New Garia, Kolkata-79" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                </Grid>
              </Grid>
            </Paper>

            {/* Variants */}
            <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Product Variants</Typography>
                <Button startIcon={<AddIcon />} variant="outlined" size="small" onClick={addVariant} sx={{ borderRadius: 2 }}>
                  Add Variant
                </Button>
              </Box>
              <Stack spacing={2}>
                {variants.map((variant, index) => (
                  <Box key={variant.id} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, position: 'relative' }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                          label="Weight Range"
                          name="variantWeight[]"
                          fullWidth
                          size="small"
                          placeholder="425-475"
                          sx={{ bgcolor: 'white' }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField
                          label="Size (cm)"
                          name="variantSize[]"
                          fullWidth
                          size="small"
                          placeholder="±12"
                          sx={{ bgcolor: 'white' }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <TextField
                          label="T. Weight"
                          name="variantTotalWeight[]"
                          fullWidth
                          size="small"
                          placeholder="±450"
                          sx={{ bgcolor: 'white' }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 1 }}>
                        <IconButton color="error" onClick={() => removeVariant(variant.id)} disabled={variants.length === 1}>
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Stack>
        </Grid>

        {/* Right Column: Media & Actions */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={4}>
            {/* Visibility */}
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

            {/* Images */}
            <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Main Display Image</Typography>
              
              {mainImagePreview && (
                <Box sx={{ mb: 2, position: "relative" }}>
                  <Avatar 
                    src={mainImagePreview} 
                    variant="rounded" 
                    sx={{ width: '100%', height: 200, borderRadius: 2, border: '1px solid', borderColor: 'divider' }} 
                  />
                  <IconButton 
                    size="small" 
                    onClick={() => setMainImagePreview(null)}
                    sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'white' } }}
                  >
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
                </Box>
              )}

              <Button
                component="label"
                variant="outlined"
                fullWidth
                startIcon={<UploadIcon />}
                sx={{ height: mainImagePreview ? 50 : 100, borderStyle: 'dashed', borderRadius: 2 }}
              >
                {mainImagePreview ? "Change Photo" : "Upload Photo"}
                <input type="file" name="mainImage" hidden accept="image/*" onChange={handleMainImageChange} />
              </Button>

              <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>Product Gallery</Typography>
              
              {galleryFiles.length > 0 && (
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  {galleryFiles.map((file, i) => (
                    <Grid size={{ xs: 4 }} key={i} sx={{ position: 'relative' }}>
                      <Avatar 
                        src={URL.createObjectURL(file)} 
                        variant="rounded" 
                        sx={{ width: '100%', height: 80, border: '1px solid', borderColor: 'divider' }} 
                      />
                      <IconButton 
                        size="small" 
                        onClick={() => removeGalleryFile(i)}
                        sx={{ 
                          position: 'absolute', 
                          top: -4, 
                          right: -4, 
                          bgcolor: 'error.main', 
                          color: 'white',
                          width: 20,
                          height: 20,
                          '&:hover': { bgcolor: 'error.dark' }
                        }}
                      >
                        <CloseIcon sx={{ fontSize: 12 }} />
                      </IconButton>
                    </Grid>
                  ))}
                  <Grid size={{ xs: 12 }}>
                    <Button size="small" color="error" onClick={() => setGalleryFiles([])}>Clear All</Button>
                  </Grid>
                </Grid>
              )}

              <Button
                component="label"
                variant="outlined"
                fullWidth
                startIcon={<AddIcon />}
                sx={{ height: 60, borderStyle: 'dashed', borderRadius: 2 }}
              >
                Add Multiple Photos
                <input type="file" name="gallery" multiple hidden accept="image/*" onChange={handleGalleryChange} />
              </Button>
            </Paper>

            {/* Documents */}
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

              <Button
                component="label"
                variant="outlined"
                fullWidth
                startIcon={<UploadIcon />}
                sx={{ borderRadius: 2 }}
              >
                Attach PDF Files
                <input type="file" name="documents" multiple hidden accept="application/pdf" onChange={handleDocumentChange} />
              </Button>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
